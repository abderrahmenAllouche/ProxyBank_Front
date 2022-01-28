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
import { ActivatedRoute, Router,ParamMap } from '@angular/router';


@Component({
  selector: 'app-ajout-compte-epargne',
  templateUrl: './ajout-compte-epargne.component.html',
  styleUrls: ['./ajout-compte-epargne.component.css']
})
export class AjoutCompteEpargneComponent implements OnInit {


  public client!: Client;
  public compteEpargne!: FormGroup;
  public id!:any;

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
    private activatedRoute: ActivatedRoute,
    private router: Router

  ) {

  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      this.id = paramMap.get('id');
    });

    this.utilisateur = this.storageService.getUserFromLocalStorage()
    this.setView(this.utilisateur.role);

    this.client;
    this.compteEpargne;
    this.compteEpargne = this.fb.group({

        solde: ['', Validators.required],
        taux: ['', Validators.required]

    });

    this.getClientById(this.id);
  }

  getClientById(id: any) {
    this.clientService.getClientById(id).subscribe(
      (data) => {
        console.log(data)
        this.client = data;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  ajoutCompteEpargne():void{
    const data = this.compteEpargne.value;
    if(this.utilisateur.role=="CONSEILLER"){
      this.authService.getConseiller(this.utilisateur.id).subscribe(
        (conseiller) => {
          data.idConseiller=conseiller.id;
          this.clientService.ajoutCompteEpargne(this.id ,data).subscribe(
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
      this.clientService.ajoutCompteEpargne(this.id ,data).subscribe(
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

  redirection(){
    this.router.navigate(['/client-list'])
  }

  redirectionadmin(){
    this.router.navigate(['/client'])
  }

}
