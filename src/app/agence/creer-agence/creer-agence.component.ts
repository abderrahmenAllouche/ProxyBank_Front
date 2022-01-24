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
import { Router } from '@angular/router';

@Component({
  selector: 'app-creer-agence',
  templateUrl: './creer-agence.component.html',
  styleUrls: ['./creer-agence.component.css'],
})
export class CreerAgenceComponent implements OnInit {
  
  public agences!: Array<Agence>;
  public agence!: FormGroup;

  constructor( private agenceService:AgenceService,
    private fb: FormBuilder,
    private router: Router,
  ) {
  this.agences = [];
  }     

  ngOnInit(): void {
    this.getAgence();
    this.agence= this.fb.group({
      nom: ['', Validators.required],
      
    });

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
    afficherMessage(error: any) {
      console.log(error);
      if (error.response != undefined) {
        alert(error.response);
      }else{
        alert(error.error)
      } 
    }
  
    redirection(){
      this.router.navigate(['/agences'])
    }
}
