import { Client } from './../../shared/models/client.model';
import { ClientService } from '../../shared/service/client.service';
import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormBuilder,
  Validator,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-client',
  templateUrl: './creation-Client.component.html',
  styleUrls: ['./creation-Client.component.css'],
})
export class CreationClientComponent implements OnInit {
  public clients: Array<Client>;
  public client!: FormGroup;
  public compteCourant! : FormGroup;
  public clientModifier!: FormGroup;
  public errorMessage!: string;
  public errorMessageModifier!: string;
  public idAModifer!: string;
  public isModifier!: false;

  constructor(
    private clientService: ClientService,
    private fb: FormBuilder
  ) {
    this.clients = [];
  }

  ngOnInit(): void {
    this.getClient();
    this.client;
    this.compteCourant;
    this.client = this.fb.group({
      nom: ['', Validators.required],
      preNom: ['', Validators.required],
      adresse: ['', Validators.required],
      tel: ['', Validators.required],

      compteCourant:  this.fb.group({
      solde :['']

    })

    });

    this.clientModifier = this.fb.group({
      nom: ['', Validators.required],
      preNom: ['', Validators.required],
      adrese: ['', Validators.required],
      tel: ['', Validators.required],
      });
  }

  getClient() {
    this.clientService.getAll().subscribe(
      (data) => {
        this.clients = data;
      },
      (error) => {
        console.log(error);
      }
    );


  }

  supprimerClient(id: number) {
    this.clientService.supprimerClient(id).subscribe(
      (response) => {
        console.log(response);
        this.getClient();
        this.afficherMessage(response)
      },
      (error) => {
        this.afficherMessage(error);
      }
    );
  }

  creerClient(): void {
    const data = this.client.value;
    this.clientService.create(data).subscribe(
      (response) => {
        console.log(response)
        this.getClient()
        this.afficherMessage(response)
      },
      (error) => {
        this.afficherMessage(error);
      }
    );
  }

  modifierClient(id: number) {
    const data = this.clientModifier.value;
    this.clientService.modifier(data, id).subscribe(
      (response) => {
        console.log(response)
        this.getClient()
        this.afficherMessage(response)
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
}
