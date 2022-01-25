import { Route, RouterModule } from '@angular/router';
import { AuditComponent } from './agence/audit/audit.component';
import { CreerAgenceComponent } from './agence/creer-agence/creer-agence.component';
import { GestionAgenceGerantComponent } from './agence/gestion-agence-gerant/gestion-agence-gerant.component';
import { AgenceComponent } from './agence/gestion-agence/gestion-agence.component';
import { ModifierAgenceComponent } from './agence/modifier-agence/modifier-agence.component';
import { CreationClientComponent } from './client/creation-client/creation-client.component';
import { AdminGestionConseillerComponent } from './conseiller/admin-gestion-conseiller/admin-gestion-conseiller.component';
import { GestionClientComponent } from './client/gestion-Client/gestion-Client.component';
import { CreerConseillerComponent } from './conseiller/creer-conseiller/creer-conseiller.component';
import { GestionConseillerClientComponent } from './conseiller/gestion-conseiller-client/gestion-conseiller-client.component';
import { ConseillerComponent } from './conseiller/gestion-conseiller/conseiller.component';
import { ModificationConseillerComponent } from './conseiller/modification-conseiller/modification-conseiller.component';
import { CreerGerantComponent } from './gerant/creer-gerant/creer-gerant.component';
import { GestionGerantConseillerComponent } from './gerant/gestion-gerant-conseiller/gestion-gerant-conseiller.component';
import { GerantComponent } from './gerant/gestion-gerant/gestion-gerant.component';
import { ModifierGerantComponent } from './gerant/modifier-gerant/modifier-gerant.component';
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
  { path: 'agences', component: AgenceComponent },
  { path: 'agences/new', component: CreerAgenceComponent },
  { path: 'agences/:id', component: ModifierAgenceComponent },
  { path: 'gestion-agences', component: AgenceComponent },
  { path: 'gestion-agences-gerants', component: GestionAgenceGerantComponent},
  { path: 'gerants', component: GerantComponent },
  { path: 'gerants/new', component: CreerGerantComponent },
  { path: 'gerants/:id', component: ModifierGerantComponent },
  { path: 'gestion-gerants', component: GerantComponent },
  { path: 'audit/:id', component: AuditComponent },
  { path: 'client/new', component: CreationClientComponent },
  {
    path: 'admin/gestion-conseillers',
    component: AdminGestionConseillerComponent,
  },
  { path: 'admin/gestion-utilisateur', component: GestionUtilisateurComponent },
  { path: '404', component: NotfoundComponent },
  //Mettre le path ** en dernier
  { path: '**', redirectTo: '404' },
];
export const AppRouting = RouterModule.forRoot(APP_ROUTE);
