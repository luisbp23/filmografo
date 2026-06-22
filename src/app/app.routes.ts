import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Search } from './pages/search/search';
import { Filmes } from './pages/filmes/filmes';
import { Series } from './pages/series/series';
import { Pessoas } from './pages/pessoas/pessoas';

// Imports atualizados com os novos caminhos integrados
import { FilmeDetalhe } from './pages/filmes/filme-detalhe/filme-detalhe';
import { SerieDetalhe } from './pages/series/serie-detalhe/serie-detalhe';
import { PessoaDetalhe } from './pages/pessoas/pessoa-detalhe/pessoa-detalhe';

export const routes: Routes = [
    { path: '', component: Home },
    { path: 'pesquisa', component: Search },
    { path: 'filmes', component: Filmes },
    { path: 'filmes/:id', component: FilmeDetalhe },
    { path: 'series', component: Series },
    { path: 'series/:id', component: SerieDetalhe },
    { path: 'pessoas', component: Pessoas },
    { path: 'pessoas/:id', component: PessoaDetalhe },
    { path: '**', redirectTo: '' }
];