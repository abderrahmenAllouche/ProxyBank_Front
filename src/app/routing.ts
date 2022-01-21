import {Route, RouterModule} from '@angular/router';
import { AppComponent } from './app.component';
import { CreerConseillerComponent } from './conseiller/creer-conseiller/creer-conseiller.component';
import { GestionConseillerClientComponent } from './conseiller/gestion-conseiller-client/gestion-conseiller-client.component';
import { ConseillerComponent } from './conseiller/gestion-conseiller/conseiller.component';
import { ModificationConseillerComponent } from './conseiller/modification-conseiller/modification-conseiller.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';

const APP_ROUTE: Route[]= [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'home', component: HomeComponent },
    {path: 'conseillers', component: ConseillerComponent},
    {path: 'conseillers/new', component: CreerConseillerComponent},
    {path: 'conseillers/:id', component: ModificationConseillerComponent},
    {path: 'gestion-conseillers', component: GestionConseillerClientComponent},
    
  ]
export const AppRouting = RouterModule.forRoot(APP_ROUTE)