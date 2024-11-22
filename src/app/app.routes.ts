import { Routes } from '@angular/router';

import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

import { FeedComponent } from './components/home/feed/feed.component';
import { ReelComponent } from './components/home/reel/reel.component';
import { SearchComponent } from './components/home/search/search.component';

const homeRoutes: Routes = [
    { path: 'feed', component: FeedComponent },
    { path: 'reel', component: ReelComponent },
    { path: 'search', component: SearchComponent }
];

export const routes: Routes = [
    { path: '', component: LoginComponent },
    { path: 'login', component: LoginComponent },
    { path: 'home', component: HomeComponent, children: homeRoutes },
    { path: '**', component: PageNotFoundComponent }
];
