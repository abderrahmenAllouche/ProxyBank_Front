import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ConseillerComponent } from './conseiller/gestion-conseiller/conseiller.component';
import { ConseillerService } from './shared/service/conseiller.service';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { ModificationConseillerComponent } from './conseiller/modification-conseiller/modification-conseiller.component';
import { AppRouting } from './routing';
import { GestionConseillerClientComponent } from './conseiller/gestion-conseiller-client/gestion-conseiller-client.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { CreerConseillerComponent } from './conseiller/creer-conseiller/creer-conseiller.component';
import { AgenceComponent} from './agence/gestion-agence/gestion-agence.component'
import { CreerAgenceComponent } from './agence/creer-agence/creer-agence.component';
import { ModifierAgenceComponent } from './agence/modifier-agence/modifier-agence.component';
import { GestionAgenceGerantComponent } from './agence/gestion-agence-gerant/gestion-agence-gerant.component';
import { AuditComponent } from './agence/audit/audit.component';
import { CreerGerantComponent } from './gerant/creer-gerant/creer-gerant.component';
import { GerantComponent } from './gerant/gestion-gerant/gestion-gerant.component';
import { ModifierGerantComponent } from './gerant/modifier-gerant/modifier-gerant.component';
import { GestionGerantConseillerComponent } from './gerant/gestion-gerant-conseiller/gestion-gerant-conseiller.component';
import { AgenceService } from './shared/service/agence.service';
import { GerantService } from './shared/service/gerant.service';

@NgModule({
  declarations: [
    AppComponent,
    ConseillerComponent,
    HeaderComponent,
    FooterComponent,
    ModificationConseillerComponent,
    GestionConseillerClientComponent,
    LoginComponent,
    HomeComponent,
    CreerConseillerComponent,
    AgenceComponent,
    CreerAgenceComponent,
    ModifierAgenceComponent,
    GestionAgenceGerantComponent,
    AuditComponent,
    CreerGerantComponent,
    GerantComponent,
    ModifierGerantComponent,
    GestionGerantConseillerComponent
  ],
  imports: [
    BrowserModule,
    AppRouting,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule
  ],
  providers: [ConseillerService,AgenceService,GerantService],
  bootstrap: [AppComponent]
})
export class AppModule { }
