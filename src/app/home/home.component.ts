import { newArray } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';

import { Conseiller } from '../shared/models/conseiller.model';
import { Gerant } from '../shared/models/gerant.model';
import { Client } from '../shared/models/client.model';
import { Utilisateur } from '../shared/models/utilisateur.model';
import { AuthService } from '../shared/service/auth.service';
import { StorageService } from '../shared/service/storage.service';


import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  roleTab: Array<boolean> = [
    /* ADMIN 0 */ false,
    /* GERANT 1 */ false,
    /* CONSEILLER 2 */ false,
  ];
  public conseiller: Conseiller= {
    id:0,
    nom: '',
    clients: new Array,
    gerant_id: 0
  };
  public gerant: Gerant = {
    id: 0,
    nom: '',
    agence_id: 0,
    conseillers: new Array
  };
  utilisateur: Utilisateur = {
    id: 0,
    username: '',
    password: '',
    role: '',
    actif: false,
  };


  constructor(
    private storageService: StorageService,
    private authService: AuthService,
    private router:Router,
    private activatedRoute : ActivatedRoute
  ) {}
  ngOnInit(): void {
    
    this.utilisateur = this.storageService.getUserFromLocalStorage();
    if (this.utilisateur.actif) {
      this.setView(this.utilisateur.role);
      if (this.utilisateur.role == 'CONSEILLER') {
        this.getConseiller();
      }
      if (this.utilisateur.role == 'GERANT') {
        this.getGerant();
      }
    }
  }

  getConseiller() {
    this.authService.getConseiller(this.utilisateur.id).subscribe(
      (data) => {
        this.conseiller = data;
      },
      (error) => {
      }
    );
  }


  getGerant() {
    this.authService.getGerant(this.utilisateur.id).subscribe(
      (data) => {
        this.gerant = data;
      },
      (error) => {
      }
    );
  }

  setView(role: string) {
    switch (role) {
      case 'CONSEILLER':
        this.roleTab = [false, false, true];
        break;
      case 'GERANT':
        this.roleTab = [false, true, false];
        break;
      case 'ADMIN':
        this.roleTab = [true, false, false];
        break;
    }
  }
    redirectionAudit(id : number){
      console.log(id)
      this.router.navigate(['/audit',id])
}
}
