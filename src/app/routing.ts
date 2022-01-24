import { Route, RouterModule } from '@angular/router';
import { AdminGestionConseillerComponent } from './conseiller/admin-gestion-conseiller/admin-gestion-conseiller.component';
import { CreerConseillerComponent } from './conseiller/creer-conseiller/creer-conseiller.component';
import { GestionConseillerClientComponent } from './conseiller/gestion-conseiller-client/gestion-conseiller-client.component';
import { ConseillerComponent } from './conseiller/gestion-conseiller/conseiller.component';
import { ModificationConseillerComponent } from './conseiller/modification-conseiller/modification-conseiller.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { GestionUtilisateurComponent } from './utilisateur/gestion-utilisateur/gestion-utilisateur.component';

const APP_ROUTE: Route[] = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: 'conseillers', component: ConseillerComponent },
  { path: 'conseillers/new', component: CreerConseillerComponent },
  { path: 'conseillers/:id', component: ModificationConseillerComponent },
  { path: 'gestion-conseillers', component: GestionConseillerClientComponent },
  { path: 'admin/gestion-conseillers', component: AdminGestionConseillerComponent },
  {path : 'admin/gestion-utilisateur', component: GestionUtilisateurComponent},
  { path: '404', component: NotfoundComponent},
  //Mettre le path ** en dernier
  {path : '**', redirectTo: '404'}
];
export const AppRouting = RouterModule.forRoot(APP_ROUTE);
