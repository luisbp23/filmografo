import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Search } from './pages/search/search';
import { Filmes } from './pages/filmes/filmes';
import { Series } from './pages/series/series';
import { Pessoas } from './pages/pessoas/pessoas';
import { Login } from './pages/login/login';
import { SignUp } from './pages/signup/signup';

export const routes: Routes = [
    { path: '', component: Home },
    { path: 'pesquisa', component: Search },
    { path: 'filmes', component: Filmes },
    { path: 'series', component: Series },
    { path: 'pessoas', component: Pessoas },
    { path: 'login', component: Login },
    { path: 'signup', component: SignUp },
    { path: '**', redirectTo: '' }
];
