import { Client } from './../../shared/models/client.model';
import { ClientService } from '../../shared/service/client.service';
import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormBuilder,
  Validator,
  Validators,
} from '@angular/forms';
import { Utilisateur } from 'src/app/shared/models/utilisateur.model';
import { AuthService } from 'src/app/shared/service/auth.service';
import { StorageService } from 'src/app/shared/service/storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-client',
  templateUrl: './creation-client.component.html',
  styleUrls: ['./creation-client.component.css'],
})
export class CreationClientComponent implements OnInit {
  public clients: Array<Client>;
  public client!: FormGroup;
  public compteCourant!: FormGroup;
  public activateButton: boolean = false;

  utilisateur: Utilisateur = {
    id: 0,
    username: '',
    password: '',
    role: '',
    actif: false,
  };
  roleTab: Array<boolean> = [
    /* ADMIN 0 */ false,
    /* GERANT 1 */ false,
    /*CONSEILLER2*/ false,
  ];

  constructor(
    private clientService: ClientService,
    private fb: FormBuilder,
    private storageService : StorageService,
    private authService: AuthService,
    private router : Router
  ) {
    this.clients = [];
  }

  ngOnInit(): void {
    this.utilisateur = this.storageService.getUserFromLocalStorage()
    this.setView(this.utilisateur.role);

    this.client;
    this.compteCourant;
    this.client = this.fb.group({
      nom: ['', Validators.required],
      preNom: ['', Validators.required],
      adresse: ['', Validators.required],
      tel: ['', Validators.required],
      idConseiller: ['', Validators.required],
      compteCourant: this.fb.group({
        solde: ['', Validators.required],


      })
    });
  }

  creerClient(): void {
    const data = this.client.value;
    if(this.utilisateur.role=="CONSEILLER"){
      this.authService.getConseiller(this.utilisateur.id).subscribe(
        (conseiller) => {
          data.idConseiller=conseiller.id;
          this.clientService.create(data).subscribe(
            (response) => {
              console.log(response)

              this.afficherMessage(response)
              this.redirection()
            },
            (error) => {
              this.afficherMessage(error);
            }
          );
        }
      )
    }else{
      this.clientService.create(data).subscribe(
        (response) => {
          console.log(response)

          this.afficherMessage(response)
        },
        (error) => {
          this.afficherMessage(error);
          this.redirectionadmin()
        }
      );
    }
  }

  afficherMessage(error: any) {
    console.log(error.response);
    if (error.response != undefined) {
      alert(error.response);
    }
  }

  setView(role: string) {
    switch (role) {
      case 'GERANT':
        this.roleTab = [false, true,false];
        break;
      case 'ADMIN':
        this.roleTab = [true, false,false];
        break;
      case 'CONSEILLER':
        this.roleTab = [false, false,true];
        break;
    }
  }

  isClicked():boolean{
    return this.activateButton= true;
  }

  redirection(){
    this.router.navigate(['/client-list'])
  }
  redirectionadmin(){
    this.router.navigate(['/client'])
  }
}
