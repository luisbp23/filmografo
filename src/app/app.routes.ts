import { Routes } from '@angular/router';
import { Home } from './home/home';
import { Search } from './search/search';
import { Filmes } from './filmes/filmes';
import { Series } from './series/series';
import { Pessoas } from './pessoas/pessoas';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'pesquisa', component: Search },
  { path: 'filmes', component: Filmes },
  { path: 'series', component: Series },
  { path: 'pessoas', component: Pessoas },
  { path: '**', redirectTo: '' }
];