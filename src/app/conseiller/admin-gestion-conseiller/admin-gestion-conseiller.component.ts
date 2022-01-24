import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Conseiller } from 'src/app/shared/models/conseiller.model';
import { ConseillerService } from 'src/app/shared/service/conseiller.service';

@Component({
  selector: 'app-admin-gestion-conseiller',
  templateUrl: './admin-gestion-conseiller.component.html',
  styleUrls: ['./admin-gestion-conseiller.component.css']
})
export class AdminGestionConseillerComponent implements OnInit {

  public conseillers: Array<Conseiller>;
  public conseiller!: FormGroup;
  

  constructor(
    private conseillerService: ConseillerService,
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
}
