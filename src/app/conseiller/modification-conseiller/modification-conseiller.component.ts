import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Conseiller } from 'src/app/shared/models/conseiller.model';
import { ConseillerService } from 'src/app/shared/service/conseiller.service';

@Component({
  selector: 'app-modification-conseiller',
  templateUrl: './modification-conseiller.component.html',
  styleUrls: ['./modification-conseiller.component.css']
})
export class ModificationConseillerComponent implements OnInit {
  public conseillerModifier!: FormGroup;
  public conseiller!: Conseiller;
  public id!: string | null ;

  constructor(
    private conseillerService: ConseillerService,
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    
    this.activatedRoute.paramMap.subscribe( (paramMap: ParamMap) =>{
      console.log(paramMap.get('id'))
      this.id = paramMap.get('id')
    });

    this.getConseillerById(this.id);

    this.conseillerModifier = this.fb.group({
      nom: ['', Validators.required],
      gerant_id: ['', Validators.required],
    });
  }


  getConseillerById(id : any) {
    this.conseillerService.getById(id).subscribe(
      (data) => {
        this.conseiller = data;
        console.log(this.conseiller)
      },
      (error) => {
        console.log(error);
      }
    );
  }

  modifierConseiller(id: number) {
    const data = this.conseillerModifier.value;
    this.conseillerService.modifier(data, id).subscribe(
      (response) => {
        console.log(response)
        this.getConseillerById(id);
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
