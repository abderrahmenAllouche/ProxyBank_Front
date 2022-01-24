import { Component, OnInit } from '@angular/core';
import { Gerant } from 'src/app/shared/models/gerant.model';
import { GerantService } from 'src/app/shared/service/gerant.service';
import {
  FormControl,
  FormGroup,
  FormBuilder,
  Validator,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-gestion-gerant',
  templateUrl: './gestion-gerant.component.html',
  styleUrls: ['./gestion-gerant.component.css'],
})

export class GerantComponent implements OnInit {
  public gerants!: Array<Gerant>;
  public gerant!: FormGroup;
  public gerantModifier!: FormGroup;
  

  constructor(private gerantService: GerantService,
    private fb: FormBuilder
    ) { 
      this.gerants = [];
    }

    ngOnInit(): void {
        this.getGerant();
       this.gerant = this.fb.group({
        nom: ['', Validators.required],
        agence_id: ['', Validators.required],
        
      });
  
      this.gerantModifier = this.fb.group({
        nom: ['', Validators.required],
        agence_id: ['', Validators.required],
       
      });
    }
  
    getGerant() {
      this.gerantService.getAll().subscribe(
        (data) => {
          this.gerants = data;
        },
        (error) => {
          console.log(error);
        }
      );
  
      
    }
  
    supprimerGerant(id: number) {
      this.gerantService.supprimerGerant(id).subscribe(
        (response) => {
          console.log(response);
          this.getGerant();
          this.afficherMessage(response)
        },
        (error) => {
          this.afficherMessage(error);
        }
      );
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
  
    modifierGerant(id: number) {
      const data = this.gerantModifier.value;
      this.gerantService.modifier(data, id).subscribe(
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
  
    afficherMessage(error: any) {
      console.log(error);
      if (error.response != undefined) {
        alert(error.response);
      } else{
        alert(error.error);
        
      }
    }
}

  