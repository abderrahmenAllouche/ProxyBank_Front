import { GestionClientComponent } from './client/gestion-Client/gestion-Client.component';
import { CreationClientComponent } from './client/creation-client/creation-client.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ConseillerComponent } from './conseiller/gestion-conseiller/conseiller.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { ModificationConseillerComponent } from './conseiller/modification-conseiller/modification-conseiller.component';
import { AppRouting } from './routing';
import { GestionConseillerClientComponent } from './conseiller/gestion-conseiller-client/gestion-conseiller-client.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { CreerConseillerComponent } from './conseiller/creer-conseiller/creer-conseiller.component';
import { ClientService } from './shared/service/client.service';
import { ConseillerService } from './shared/service/conseiller.service';

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
    CreationClientComponent,
    GestionClientComponent
  ],
  imports: [
    BrowserModule,
    AppRouting,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule
  ],
  providers: [ConseillerService,ClientService],
   bootstrap: [AppComponent]
})
export class AppModule { }
