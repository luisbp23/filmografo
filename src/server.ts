import 'zone.js/node';
import {
  AngularNodeAppEngine,
  createNodeRequestHandler,
  isMainModule,
  writeResponseToNodeResponse,
} from '@angular/ssr/node';
import express from 'express';
import { join } from 'node:path';

// Carrega variáveis de .env (ex: TMDB_TOKEN) em desenvolvimento.
// Em produção, as variáveis vêm normalmente do próprio ambiente de hosting,
// por isso ignoramos o erro se o ficheiro .env não existir.
try {
  process.loadEnvFile();
} catch {
  // .env não existe — assume-se que as variáveis já estão no ambiente.
}

const browserDistFolder = join(import.meta.dirname, '../browser');

const app = express();
const angularApp = new AngularNodeAppEngine();

/**
 * Proxy para a API da TMDB.
 *
 * O browser nunca fala diretamente com api.themoviedb.org (evita CORS e
 * mantém o token fora do bundle JS enviado ao cliente). O token vem de
 * uma variável de ambiente, nunca deve ficar hardcoded no código.
 */
const TMDB_API_URL = 'https://api.themoviedb.org/3';
const TMDB_TOKEN = process.env['TMDB_TOKEN'];

async function fetchFromTmdb(path: string, res: express.Response): Promise<void> {
  if (!TMDB_TOKEN) {
    res.status(500).json({ error: 'TMDB_TOKEN não está configurado no servidor.' });
    return;
  }

  try {
    const tmdbResponse = await fetch(`${TMDB_API_URL}${path}`, {
      headers: {
        Authorization: `Bearer ${TMDB_TOKEN}`,
        accept: 'application/json',
      },
    });

    if (!tmdbResponse.ok) {
      res.status(tmdbResponse.status).json({ error: 'Erro ao contactar a TMDB.' });
      return;
    }

    const data = await tmdbResponse.json();
    res.json(data);
  } catch (error) {
    console.error('Erro no proxy TMDB:', error);
    res.status(502).json({ error: 'Não foi possível obter dados da TMDB.' });
  }
}

app.get('/api/movies/popular', async (req, res) => {
  const language = (req.query['language'] as string) || 'pt-PT';
  const page = (req.query['page'] as string) || '1';
  await fetchFromTmdb(
    `/movie/popular?language=${encodeURIComponent(language)}&page=${encodeURIComponent(page)}`,
    res,
  );
});

app.get('/api/movies/trending', async (req, res) => {
  const language = (req.query['language'] as string) || 'pt-PT';
  const window = req.query['window'] === 'week' ? 'week' : 'day';
  await fetchFromTmdb(
    `/trending/movie/${window}?language=${encodeURIComponent(language)}`,
    res,
  );
});

app.get('/api/search', async (req, res) => {
  const query = (req.query['query'] as string) || '';
  const language = (req.query['language'] as string) || 'pt-PT';
  
  if (!query) {
    res.json({ page: 1, results: [], total_pages: 0, total_results: 0 });
    return;
  }

  await fetchFromTmdb(
    `/search/multi?query=${encodeURIComponent(query)}&language=${encodeURIComponent(language)}`,
    res,
  );
});

/**
 * Serve static files from /browser
 */
app.use(
  express.static(browserDistFolder, {
    maxAge: '1y',
    index: false,
    redirect: false,
  }),
);

/**
 * Handle all other requests by rendering the Angular application.
 */
app.use((req, res, next) => {
  angularApp
    .handle(req)
    .then((response) =>
      response ? writeResponseToNodeResponse(response, res) : next(),
    )
    .catch(next);
});

/**
 * Start the server if this module is the main entry point, or it is ran via PM2.
 * The server listens on the port defined by the `PORT` environment variable, or defaults to 4000.
 */
if (isMainModule(import.meta.url) || process.env['pm_id']) {
  const port = process.env['PORT'] || 4000;
  app.listen(port, (error) => {
    if (error) {
      throw error;
    }

    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

/**
 * Request handler used by the Angular CLI (for dev-server and during build) or Firebase Cloud Functions.
 */
export const reqHandler = createNodeRequestHandler(app);