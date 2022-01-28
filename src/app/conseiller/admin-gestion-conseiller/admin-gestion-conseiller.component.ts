import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Conseiller } from 'src/app/shared/models/conseiller.model';
import { Utilisateur } from 'src/app/shared/models/utilisateur.model';
import { ConseillerService } from 'src/app/shared/service/conseiller.service';
import { StorageService } from 'src/app/shared/service/storage.service';

@Component({
  selector: 'app-admin-gestion-conseiller',
  templateUrl: './admin-gestion-conseiller.component.html',
  styleUrls: ['./admin-gestion-conseiller.component.css']
})
export class AdminGestionConseillerComponent implements OnInit {

  public conseillers: Array<Conseiller>;
  public conseiller!: FormGroup;
  public adminUserActif:boolean=true;

  utilisateur: Utilisateur = {
    id: 0,
    username: '',
    password: '',
    role: '',
    actif: false,
  };


  constructor(
    private conseillerService: ConseillerService,
    private fb: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private storageService : StorageService,

  ) {
    this.conseillers = [];
  }

  ngOnInit(): void {
    this.getConseiller();
    this.conseiller = this.fb.group({
      nom: ['', Validators.required],
      gerant_id: ['', Validators.required],
    });

    this.utilisateur = this.storageService.getUserFromLocalStorage()

    if(this.utilisateur.role=="ADMIN"){
      this.adminUserActif=false;
    }


  }
  getConseillerDisponible(id: any) {
    throw new Error('Method not implemented.');
  }

  getConseiller() {
    this.conseillerService.getAll().subscribe(
      (data) => {
        this.conseillers = data;
      },
      (error) => {
      }
    );


  }

  supprimerConseiller(id: number) {
    this.conseillerService.supprimerConseiller(id).subscribe(
      (response) => {
        this.getConseiller();
        this.afficherMessage(response)
      },
      (error) => {
        this.afficherMessage(error);
      }
    );
  }

  creerConseiller(): void {
    const data = this.conseiller.value;
    this.conseillerService.create(data).subscribe(
      (response) => {
        this.getConseiller()
        this.afficherMessage(response)
      },
      (error) => {
        this.afficherMessage(error);
      }
    );
  }

  afficherMessage(error: any) {
    if (error.response != undefined) {
      alert(error.response);
    }if(error.error.response != undefined){
      alert(error.error.response)
    }else{
      alert(error.error)
    }
  }

  alertMessageSuppression(id: number){
    const confirmation = false;
    alert

    if(confirmation){
      this.supprimerConseiller(id)
    }
  }

  redirection(id: number){
    this.router.navigate(['/conseillers', id])
  }

  ajouter(){
    this.router.navigate(['/conseillers/new'])
  }
  redirectionClient(id: number) {
    this.router.navigate(['/client', id]);
  }
}
