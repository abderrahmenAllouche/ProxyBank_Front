import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Conseiller } from 'src/app/shared/models/conseiller.model';
import { NewUtilisateur } from 'src/app/shared/models/newUtilisateur.model';
import { Utilisateur } from 'src/app/shared/models/utilisateur.model';
import { AuthService } from 'src/app/shared/service/auth.service';
import { ConseillerService } from 'src/app/shared/service/conseiller.service';
import { StorageService } from 'src/app/shared/service/storage.service';

@Component({
  selector: 'app-creer-conseiller',
  templateUrl: './creer-conseiller.component.html',
  styleUrls: ['./creer-conseiller.component.css']
})
export class CreerConseillerComponent implements OnInit {
  public conseillers: Array<Conseiller>;
  public conseiller!: FormGroup;
  public newUtilisateur!: FormGroup;
  private utilisateurModel: NewUtilisateur = { 
    username: '',
    password: '',
    nom: '',
    role:'',
    superieurId:0
  };
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
  ];

  constructor(
    private conseillerService: ConseillerService,
    private fb: FormBuilder,
    private router: Router,
    private storageService : StorageService,
    private authService: AuthService
  ) { 
    this.conseillers = [];
  }

  ngOnInit(): void {
    this.utilisateur = this.storageService.getUserFromLocalStorage()
      this.setView(this.utilisateur.role);
      
      this.conseiller = this.fb.group({
        nom: ['', Validators.required],
        gerant_id: ['', Validators.required],
      });
      this.newUtilisateur = this.fb.group({
        username: ['', Validators.required],
        password: ['', Validators.required]
      });

    
  }

  creerConseiller(): void {
    const newdata = this.conseiller.value;
    const utilisateurdata = this.newUtilisateur.value
    this.utilisateurModel.username = utilisateurdata.username.toString();
    this.utilisateurModel.password = utilisateurdata.password.toString();
    this.utilisateurModel.nom = newdata.nom;
    this.utilisateurModel.superieurId =newdata.gerant_id;
    this.utilisateurModel.role ="CONSEILLER"
    if(this.utilisateur.role=='GERANT'){
      this.authService.getGerant(this.utilisateur.id).subscribe(
        (data) => {
          this.utilisateurModel.superieurId =data.id;
          this.conseillerService.create(this.utilisateurModel).subscribe(
            (response) => {
              this.getConseiller()
              this.afficherMessage(response)
              this.redirection();
            },
            (error) => {
              this.afficherMessage(error);
            }
          ); 
        },
        (error) => {
        }
      );
    }
    if(this.utilisateur.role=='ADMIN'){
      this.conseillerService.create(this.utilisateurModel).subscribe(
        (response) => {
          this.getConseiller()
          this.afficherMessage(response)
          this.redirectionadmin();
        },
        (error) => {
          this.afficherMessage(error);
        }
      );
    }


   
  }

  getConseiller() {
    this.conseillerService.getConseiller(1).subscribe(
      (data) => {
        this.conseillers = data;
      },
      (error) => {
      }
    );
  }

  afficherMessage(error: any) {
    if (error != undefined) {
      alert('Le nouveau conseiller est crée !');
    }else{
      alert(error.error.response)
    } 
  }

  redirection(){
    this.router.navigate(['/conseillers'])
  }
  redirectionadmin(){
    this.router.navigate(['/admin/gestion-conseillers'])
  }


  setView(role: string) {
    switch (role) {
      case 'GERANT':
        this.roleTab = [false, true];
        break;
      case 'ADMIN':
        this.roleTab = [true, false];
        break;
    }
  }
}
