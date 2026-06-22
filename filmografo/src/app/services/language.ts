import { Injectable, signal } from '@angular/core';

export type Lang = 'pt' | 'en';

const translations: Record<Lang, Record<string, string>> = {
  pt: {
    'search.placeholder': 'Pesquisar',
    'search.filters': 'Filtros',
    'search.all': 'Tudo',
    'search.year': 'Ano',
    'search.allYears': 'Todos',
    'search.results': 'Resultados para',
    'search.loading': 'A carregar resultados...',
    'search.noResults': 'Não foram encontrados resultados para esta pesquisa e filtros.',
    'search.type.movie': 'Filme',
    'search.type.tv': 'Série',
    'search.type.person': 'Pessoa',
    'search.badge.local': 'Local',

    'nav.filmes': 'Filmes',
    'nav.series': 'Séries',
    'nav.pessoas': 'Pessoas',
    'home.hello': 'Olá',
    'home.welcome': 'Bem-vindo(a) ao Filmógrafo!',
    'home.explore': 'Explore o catálogo de centenas de filmes e séries de todo o mundo.',
    'home.trending': 'Tendências',
    'home.popular': 'Populares',
    'home.comedy': 'Comédia',
    'home.today': 'Hoje',
    'home.thisWeek': 'Esta Semana',
    'catalog.movies.title': 'Catálogo de Filmes',
    'catalog.movies.desc': 'Descubra os filmes mais populares do momento.',
    'catalog.series.title': 'Catálogo de Séries',
    'catalog.series.desc': 'Explore as séries de televisão mais aclamadas e assistidas.',
    'catalog.people.title': 'Pessoas',
    'catalog.people.desc': 'Atores e realizadores que estão em destaque nas bilheteiras.',
    'auth.login': 'Login',
    'auth.logout': 'Terminar sessão',
    'auth.settings': 'Definições',

    'detail.synopsis': 'Sinopse',
    'detail.noSynopsis': 'Nenhuma sinopse disponível em português.',
    'detail.cast': 'Elenco Principal',
    'detail.rating': 'Avaliação TMDB',
    'detail.unknown': 'Desconhecido',
    'placeholder.noPosterUrl': 'Sem+Poster',
    'placeholder.noPhotoUrl': 'Sem+Foto',

    'detail.duration': 'Duração',
    'detail.minutes': 'minutos',
    'detail.budget': 'Orçamento',
    'detail.loading.movie': 'A carregar detalhes do filme...',
    'detail.error.movie': 'Não foi possível encontrar as informações deste filme.',

    'detail.seasons': 'Temporadas',
    'detail.episodes': 'Episódios',
    'detail.status': 'Estado',
    'detail.loading.series': 'A carregar detalhes da série...',
    'detail.error.series': 'Não foi possível encontrar as informações desta série.',

    'person.profession': 'Profissão',
    'person.birthday': 'Nascimento',
    'person.birthplace': 'Local',
    'person.biography': 'Biografia',
    'person.noBiography': 'Biografia não disponível em português.',
    'person.knownFor': 'Conhecido(a) por',
    'detail.loading.person': 'A carregar detalhes da pessoa...',
    'detail.error.person': 'Não foi possível encontrar as informações desta pessoa.',

    'review.title': 'Avaliar',
    'review.rating': 'Classificação',
    'review.text': 'Crítica',
    'review.textPlaceholder': 'Escreva a sua crítica',
    'review.submit': 'Submeter',

    // --- LOGIN ---
    'login.title': 'Iniciar Sessão',
    'login.username': 'Nome de utilizador',
    'login.password': 'Password',
    'login.required': 'Campo obrigatório',
    'login.loading': 'A entrar...',
    'login.submit': 'Iniciar sessão',
    'login.noAccount': 'Não tem conta?',
    'login.register': 'Registe-se',

    // --- SIGNUP ---
    'signup.title': 'Criar Conta',
    'signup.minPassword': 'Mínimo 6 caracteres',
    'signup.confirmPassword': 'Confirmar password',
    'signup.passwordMismatch': 'As passwords não coincidem',
    'signup.loading': 'A criar conta...',
    'signup.submit': 'Criar conta',
    'signup.hasAccount': 'Já tem conta?',

    // --- ADD CONTENT ---
    'addcontent.title': 'Adicionar ao Catálogo',
    'addcontent.type': 'Tipo de Conteúdo',
    'addcontent.movie': 'Filme',
    'addcontent.series': 'Série',
    'addcontent.titleField': 'Título',
    'addcontent.titlePlaceholder': 'Ex: O Padrinho, Interstellar, Friends...',
    'addcontent.genre': 'Género',
    'addcontent.genrePlaceholder': 'Ex: Ficção Científica, Drama',
    'addcontent.state': 'Estado',
    'addcontent.state.released': 'Lançado',
    'addcontent.state.inProduction': 'Em Produção',
    'addcontent.state.announced': 'Anunciado',
    'addcontent.imageurl': 'URL da Imagem (Poster)',
    'addcontent.duration': 'Duração (em minutos)',
    'addcontent.durationPlaceholder': 'Ex: 148',
    'addcontent.episodes': 'Nº de Episódios',
    'addcontent.episodesPlaceholder': 'Ex: 73',
    'addcontent.synopsis': 'Sinopse',
    'addcontent.synopsisPlaceholder': 'Escreve o resumo da história...',
    'addcontent.processing': 'A processar...',
    'addcontent.submit': 'Adicionar Conteúdo',
  },
  en: {
    'search.placeholder': 'Search',
    'search.filters': 'Filters',
    'search.all': 'All',
    'search.year': 'Year',
    'search.allYears': 'All',
    'search.results': 'Results for',
    'search.loading': 'Loading results...',
    'search.noResults': 'No results found for this search and filters.',
    'search.type.movie': 'Movie',
    'search.type.tv': 'Series',
    'search.type.person': 'Person',
    'search.badge.local': 'Local',

    'nav.filmes': 'Movies',
    'nav.series': 'Series',
    'nav.pessoas': 'People',
    'home.hello': 'Hello',
    'home.welcome': 'Welcome to Filmógrafo!',
    'home.explore': 'Explore the catalog of hundreds of movies and series from around the world.',
    'home.trending': 'Trending',
    'home.popular': 'Popular',
    'home.comedy': 'Comedy',
    'home.today': 'Today',
    'home.thisWeek': 'This Week',
    'catalog.movies.title': 'Movies Catalog',
    'catalog.movies.desc': 'Discover the most popular movies right now.',
    'catalog.series.title': 'Series Catalog',
    'catalog.series.desc': 'Explore the most acclaimed and watched TV series.',
    'catalog.people.title': 'People',
    'catalog.people.desc': 'Actors and directors trending at the box office.',
    'auth.login': 'Login',
    'auth.logout': 'Sign out',
    'auth.settings': 'Settings',

    'detail.synopsis': 'Synopsis',
    'detail.noSynopsis': 'No synopsis available in English.',
    'detail.cast': 'Main Cast',
    'detail.rating': 'TMDB Rating',
    'detail.unknown': 'Unknown',
    'placeholder.noPosterUrl': 'No+Poster',
    'placeholder.noPhotoUrl': 'No+Photo',

    'detail.duration': 'Duration',
    'detail.minutes': 'minutes',
    'detail.budget': 'Budget',
    'detail.loading.movie': 'Loading movie details...',
    'detail.error.movie': 'Could not find information for this movie.',

    'detail.seasons': 'Seasons',
    'detail.episodes': 'Episodes',
    'detail.status': 'Status',
    'detail.loading.series': 'Loading series details...',
    'detail.error.series': 'Could not find information for this series.',

    'person.profession': 'Profession',
    'person.birthday': 'Birthday',
    'person.birthplace': 'Place of Birth',
    'person.biography': 'Biography',
    'person.noBiography': 'Biography not available in English.',
    'person.knownFor': 'Known For',
    'detail.loading.person': 'Loading person details...',
    'detail.error.person': 'Could not find information for this person.',

    'review.title': 'Rate & Review',
    'review.rating': 'Rating',
    'review.text': 'Review',
    'review.textPlaceholder': 'Write your review',
    'review.submit': 'Submit',

    // --- LOGIN ---
    'login.title': 'Sign In',
    'login.username': 'Username',
    'login.password': 'Password',
    'login.required': 'Required field',
    'login.loading': 'Signing in...',
    'login.submit': 'Sign in',
    'login.noAccount': "Don't have an account?",
    'login.register': 'Register',

    // --- SIGNUP ---
    'signup.title': 'Create Account',
    'signup.minPassword': 'Minimum 6 characters',
    'signup.confirmPassword': 'Confirm password',
    'signup.passwordMismatch': 'Passwords do not match',
    'signup.loading': 'Creating account...',
    'signup.submit': 'Create account',
    'signup.hasAccount': 'Already have an account?',

    // --- ADD CONTENT ---
    'addcontent.title': 'Add to Catalog',
    'addcontent.type': 'Content Type',
    'addcontent.movie': 'Movie',
    'addcontent.series': 'Series',
    'addcontent.titleField': 'Title',
    'addcontent.titlePlaceholder': 'E.g.: The Godfather, Interstellar, Friends...',
    'addcontent.genre': 'Genre',
    'addcontent.genrePlaceholder': 'E.g.: Science Fiction, Drama',
    'addcontent.state': 'Status',
    'addcontent.state.released': 'Released',
    'addcontent.state.inProduction': 'In Production',
    'addcontent.state.announced': 'Announced',
    'addcontent.imageurl': 'Image URL (Poster)',
    'addcontent.duration': 'Duration (in minutes)',
    'addcontent.durationPlaceholder': 'E.g.: 148',
    'addcontent.episodes': 'Number of Episodes',
    'addcontent.episodesPlaceholder': 'E.g.: 73',
    'addcontent.synopsis': 'Synopsis',
    'addcontent.synopsisPlaceholder': 'Write the story summary...',
    'addcontent.processing': 'Processing...',
    'addcontent.submit': 'Add Content',
  }
};

@Injectable({ providedIn: 'root' })
export class LanguageService {
  currentLang = signal<Lang>((localStorage.getItem('appLang') as Lang) || 'pt');

  setLang(lang: Lang): void {
    this.currentLang.set(lang);
    localStorage.setItem('appLang', lang);
    window.location.reload();
  }

  t(key: string): string {
    return translations[this.currentLang()][key] ?? key;
  }

  get tmdbLang(): string {
    return this.currentLang() === 'pt' ? 'pt-PT' : 'en-US';
  }
}