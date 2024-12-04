import { Routes } from '@angular/router';

import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

import { FeedComponent } from './components/home/feed/feed.component';
import { ReelComponent } from './components/home/reel/reel.component';
import { SearchComponent } from './components/home/search/search.component';
import { adminAuthGuardGuard } from './guards/admin-auth-guard.guard';
import { homeAuthGuardGuard } from './guards/home-auth-guard.guard';
import { AdminComponent } from './components/admin/admin.component';

const homeRoutes: Routes = [
    { path: 'feed', component: FeedComponent },
    { path: 'reel', component: ReelComponent },
    { path: 'search', component: SearchComponent }
];

export const routes: Routes = [
    { path: '', component: LoginComponent },
    { path: 'admin', component: AdminComponent, canActivate: [adminAuthGuardGuard] },
    { path: 'login', component: LoginComponent },
    { path: 'home', component: HomeComponent, children: homeRoutes, canActivate: [homeAuthGuardGuard], canActivateChild: [homeAuthGuardGuard] },
    { path: '**', component: PageNotFoundComponent }
];
