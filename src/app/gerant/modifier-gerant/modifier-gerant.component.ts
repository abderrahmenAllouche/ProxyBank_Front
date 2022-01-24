import { Component, OnInit } from '@angular/core';
import { Gerant } from 'src/app/shared/models/gerant.model';
import { GerantService } from 'src/app/shared/service/gerant.service';

import {FormGroup,FormBuilder,Validators,} from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';


@Component({
  selector: 'app-modifier-gerant',
  templateUrl: './modifier-gerant.component.html',
  styleUrls: ['./modifier-gerant.component.css'],
})
export class ModifierGerantComponent implements OnInit {
  public gerant!: Gerant;
  public gerantModifier!: FormGroup;
  public id!: string | null; 
  
  
  constructor(
    private gerantService:GerantService,
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
  ) {
  
  }    
  

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe( (paramMap: ParamMap) =>{
      console.log(paramMap.get('id'))
      this.id = paramMap.get('id')
    });

    this.getGerantById(this.id);
    this.gerantModifier= this.fb.group({
      nom: ['', Validators.required],
      
    });
  }
  getGerantById(id : any) {
    this.gerantService.getById(id).subscribe(
      (data) => {
        this.gerant = data;
        console.log(this.gerant)
      },
      (error) => {
        console.log(error);
      }
    );
  }
  modifierGerant(id: number) {
    const data = this.gerantModifier.value;
    this.gerantService.modifier(data, id).subscribe(
      (response) => {
        console.log(response)
        this.getGerantById(id);
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
}
