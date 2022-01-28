import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Client } from './../../shared/models/client.model';
import { ClientService } from '../../shared/service/client.service';
import { Component, OnInit } from '@angular/core';
import { CompteCourant } from 'src/app/shared/models/compteCourant.model';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';

@Component({
  selector: 'app-client',
  templateUrl: './modifier-client.component.html',
  styleUrls: ['./modifier-client.component.css'],
})
export class ModifierClientComponent implements OnInit {
  public client!: Client;
  public modifierClient!: FormGroup;

  public id!: string | null;
  public hasCompteEpargne: boolean=false;

   message="Hello";
  constructor(
    private clientService: ClientService,
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      this.id = paramMap.get('id');
    });

  this.getClientById(this.id);

 }

  getClientById(id: any) {
    this.clientService.getClientById(id).subscribe(
      {
        next:(data) => {
          console.log(data)
          this.client = data;
          if(this.client.compteEpargne!==null){
            this.hasCompteEpargne = true;
          }
        },

        error:(error) => {
          console.log(error);
        },

        complete:()=>{ this.modifierClient = this.fb.group({
          nom: [this.client.nom, Validators.required],
          preNom: [this.client.preNom, Validators.required],
          adresse: [this.client.adresse, Validators.required],
          tel: [this.client.tel, Validators.required],
        });}
      }

      );


  }

  modifierClientById(id: number) {
    const data = this.modifierClient.value;
    this.clientService.modifier(data, id).subscribe(
      (response) => {
        console.log(response);
        this.getClientById(this.id);
        this.afficherMessage(response);
      },
      (error) => {
        this.afficherMessage(error);
      }
    );
  }

  afficherMessage(error: any) {
    console.log(error.response);
    if (error.response != undefined) {
      alert(error.response);
    }
  }

  redirectionAjoutCompteEpargne() {
    this.router.navigate(['/AjoutCompteEpargne', this.id]);
  }
}
