import { Component, OnInit } from '@angular/core';
import { Conseiller } from '../../shared/models/conseiller.model';
import { ConseillerService } from '../../shared/service/conseiller.service';
import {
  FormControl,
  FormGroup,
  FormBuilder,
  Validator,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Utilisateur } from 'src/app/shared/models/utilisateur.model';
import { StorageService } from 'src/app/shared/service/storage.service';
import { AuthService } from 'src/app/shared/service/auth.service';
import { Gerant } from 'src/app/shared/models/gerant.model';

@Component({
  selector: 'app-conseiller',
  templateUrl: './conseiller.component.html',
  styleUrls: ['./conseiller.component.css'],
})
export class ConseillerComponent implements OnInit {
  public conseillers: Array<Conseiller>;
  public conseiller!: FormGroup;
  private utilisateur!: Utilisateur
  private gerant!: Gerant;

  constructor(
    private conseillerService: ConseillerService,
    private storageService : StorageService,
    private authService : AuthService,
    private fb: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.conseillers = [];
  }

  ngOnInit(): void {
    this.getConseiller();
    this.conseiller = this.fb.group({
      nom: ['', Validators.required],
      gerant_id: ['', Validators.required],
    });

    
  }

  getConseiller() {
    this.utilisateur = this.storageService.getUserFromLocalStorage();
    this.authService.getGerant(this.utilisateur.id).subscribe(
      (data) => {
        this.conseillerService.getConseiller(data.id).subscribe(
          (data) => {
            this.conseillers = data;
          },
          (error) => {
          }
        );
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
    }else{
      alert(error.error.response)
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
