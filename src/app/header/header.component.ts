import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Conseiller } from '../shared/models/conseiller.model';
import { Gerant } from '../shared/models/gerant.model';
import { Utilisateur } from '../shared/models/utilisateur.model';
import { AuthService } from '../shared/service/auth.service';
import { StorageService } from '../shared/service/storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  public titleActive: string = '';
  public role: string = '';
  public isConnected: boolean = false;
  public gerant: Gerant= {
    id: 0,
    nom: '',
    idAgence:0,
    conseillers: new Array
  }
  public conseiller: Conseiller= {
    id:0,
    nom: '',
    clients: new Array,
    gerant_id: 0
  };
  roleTab: Array<boolean> = [
    /* ADMIN 0 */ false,
    /* GERANT 1 */ false,
    /* CONSEILLER 2 */ false,
  ];
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
    private activatedRoute: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      this.utilisateur = this.storageService.getUserFromLocalStorage();
      if (this.utilisateur.actif) {
        this.isConnected = this.storageService.isConnected();
        this.setView(this.utilisateur.role);
        if(this.utilisateur.actif) {
          this.setView(this.utilisateur.role);
          if(this.utilisateur.role=="CONSEILLER"){
            this.getConseiller()
          }
          if(this.utilisateur.role=="GERANT"){
            this.getGerant()
          }
        }
      }
    });
  }

  logout() {
    this.authService.logout();
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
}
