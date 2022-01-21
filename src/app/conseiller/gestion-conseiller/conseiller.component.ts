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

@Component({
  selector: 'app-conseiller',
  templateUrl: './conseiller.component.html',
  styleUrls: ['./conseiller.component.css'],
})
export class ConseillerComponent implements OnInit {
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
    this.conseillerService.getConseiller().subscribe(
      (data) => {
        console.log(data)
        this.conseillers = data;
      },
      (error) => {
        console.log(error);
      }
    );

    
  }

  supprimerConseiller(id: number) {
    this.conseillerService.supprimerConseiller(id).subscribe(
      (response) => {
        console.log(response);
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
        console.log(response)
        this.getConseiller()
        this.afficherMessage(response)
      },
      (error) => {
        this.afficherMessage(error);
      }
    );
  }

  afficherMessage(error: any) {
    console.log(error);
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
    console.log('Je suis dans redirect anve l id '+id)
    this.router.navigate(['/conseillers', id])
  }

  ajouter(){
    this.router.navigate(['/conseillers/new'])
  }
}
