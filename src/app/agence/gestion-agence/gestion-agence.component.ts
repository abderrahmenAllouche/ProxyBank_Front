import { Component, OnInit } from '@angular/core';
import { Agence } from 'src/app/shared/models/agence.model';
import { AgenceService } from '../../shared/service/agence.service';
import {
  FormControl,
  FormGroup,
  FormBuilder,
  Validator,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-gestion-agence',
  templateUrl: './gestion-agence.component.html',
  styleUrls: ['./gestion-agence.component.css'],
})
export class AgenceComponent implements OnInit {
  public agences!: Array<Agence>;
  public agence!: FormGroup;
  public agenceModifier!: FormGroup;
  
  constructor(
    private agenceService:AgenceService,
    private fb: FormBuilder
  ) {
  this.agences = [];
  }    
  

  ngOnInit(): void {
    this.getAgence();
    this.agence= this.fb.group({
      nom: ['', Validators.required],
      
    });

    this.agenceModifier = this.fb.group({
      nom: ['', Validators.required],
    
    });
  }

  getAgence() {
    this.agenceService.getAll().subscribe(
      (data) => {
       
        console.log(data);
        this.agences = data;
      },
      (error) => {
        console.log(error);
      }
    );

    
  }

  supprimerAgence(id: number) {
   
    this.agenceService.supprimerAgence(id).subscribe(

      (response) => {
       console.log(response);
        this.getAgence();
        this.afficherMessage(response)
      },
      (error) => {
        this.afficherMessage(error);
      }
    );
  }

  creerAgence(): void {
    const data = this.agence.value;
    this.agenceService.create(data).subscribe(
      (response) => {
        console.log(response)
        this.getAgence()
        this.afficherMessage(response)
      },
      (error) => {
        this.afficherMessage(error);
      }
    );
  }

  modifierAgence(id: number) {
    const data = this.agenceModifier.value;
    this.agenceService.modifier(data, id).subscribe(
      (response) => {
        console.log(response)
        this.getAgence()
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
    } else{
      alert(error.error);
    }
  }
}
