import { Component, OnInit } from '@angular/core';
import { Gerant } from 'src/app/shared/models/gerant.model';
import { GerantService } from '../../shared/service/gerant.service';
import {
  FormControl,
  FormGroup,
  FormBuilder,
  Validator,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-creer-gerant',
  templateUrl: './creer-gerant.component.html',
  styleUrls: ['./creer-gerant.component.css'],
})
export class CreerGerantComponent implements OnInit {
  
  public gerants!: Array<Gerant>;
  public gerant!: FormGroup;
  

  constructor( private gerantService:GerantService,
    private fb: FormBuilder,
    private router: Router,
  ) {
  this.gerants = [];
  }     

  ngOnInit(): void {
    this.getGerant();
    this.gerant= this.fb.group({
      nom: ['', Validators.required],
      
    });

   }
   creerGerant(): void {
    const data = this.gerant.value;
    this.gerantService.create(data).subscribe(
      (response) => {
        console.log(response)
        this.getGerant()
        this.afficherMessage(response)
      },
      (error) => {
        this.afficherMessage(error);
      }
    );
  }

  getGerant() {
    this.gerantService.getAll().subscribe(
      (data) => {
       
        console.log(data);
        this.gerants = data;
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
      this.router.navigate(['/gerants'])
    }
}
