import { Component, OnInit } from '@angular/core';
import { Gerant } from 'src/app/shared/models/gerant.model';
import { GerantService } from 'src/app/shared/service/gerant.service';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { ConseillerService } from 'src/app/shared/service/conseiller.service';

@Component({
  selector: 'app-modifier-gerant',
  templateUrl: './modifier-gerant.component.html',
  styleUrls: ['./modifier-gerant.component.css'],
})
export class ModifierGerantComponent implements OnInit {
  public gerant: Gerant = {
    id: 0,
    nom: '',
    conseillers: new Array(),
    idAgence: 0,
  };
  public gerantModifier!: FormGroup;
  public id!: string | null;

  constructor(
    private gerantService: GerantService,
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private conseillerService : ConseillerService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      this.id = paramMap.get('id');
    });

    this.getGerantById(this.id);
    this.gerantModifier = this.fb.group({
      nom: ['', Validators.required],
    });
  }
  getGerantById(id: any) {
    this.gerantService.getById(id).subscribe(
      (data) => {
        this.gerant = data;
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
        this.getGerantById(id);
        this.afficherMessage(response);
        this.redirection();
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
  redirection() {
    this.router.navigate(['/gestion-gerants']);
  }
  redirectionConseiller(id: number){
    this.router.navigate(['/conseillers', id])
  }
  supprimerConseiller(id: number) {
    this.conseillerService.supprimerConseiller(id).subscribe(
      (response) => {
        this.getGerantById(this.id);
        this.afficherMessage(response)
      },
      (error) => {
        this.afficherMessage(error);
      }
    );
  }
}
