import { CompteCourant } from './../../shared/models/compteCourant.model';
import { ClientService } from './../../shared/service/client.service';
import { Client } from './../../shared/models/client.model';
import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormBuilder,
  Validator,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { MontantTransfert } from 'src/app/shared/models/montantTransfert.model';


@Component({
  selector: 'app-virement',
  templateUrl: './virement.component.html',
  styleUrls: ['./virement.component.css']
})
export class VirementComponent implements OnInit {
  public clients!: Array<Client>;
  public client!: Client;
  public id!: string | null;
  public idCompteDebiteur!: number;
  public idCompteCrediteur!: number;
  public montant!: number;
  public montantTransfert !: FormGroup;
  public montantTransfertInterne !: FormGroup;
  public montantTransfertDto!: MontantTransfert;

  public idCompteCrediteurVirementClient: any = undefined;

  constructor(
    private activatedRoute: ActivatedRoute,
    private clientService: ClientService,
    private fb: FormBuilder
  ) {
    this.clients = [];
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      this.id = paramMap.get('id')
    });

    this.getClientDebiteur(this.id);
    this.getClient();

    this.montantTransfert = this.fb.group({
      montant: ['', Validators.required]
    });

  }



  getIdCompteDebiteur(value: any) {

    // Sélectionner l'élément input et récupérer sa valeur
    this.idCompteDebiteur = value;
    console.log('id Debiteur : ' + this.idCompteDebiteur);

    this.idCompteCrediteurVirementClient = undefined;
    console.log(this.idCompteCrediteurVirementClient);

  }

  getIdCompteCrediteur(value: any) {
    if (value.compteCourant != undefined) {
      // Sélectionner l'élément input et récupérer sa valeur
      this.idCompteCrediteur = value.compteCourant.id;
      console.log(this.idCompteCrediteur);

    } else {
      this.idCompteCrediteur = value;
      console.log(this.idCompteCrediteur);
    }
  }

  getIdComptesVirementInterne(valueIdCompteDebiteur: number, valueIdCompteCrediteur: number) {
    this.idCompteDebiteur = valueIdCompteDebiteur;
    this.idCompteCrediteur = valueIdCompteCrediteur;
    console.log(this.idCompteDebiteur + "    " + this.idCompteCrediteur);

  }

  getClient() {
    this.clientService.getAll().subscribe(
      (data) => {
        console.log(data);
        this.clients = data;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  getClientDebiteur(id: any) {
    this.clientService.getClientById(id).subscribe(
      (data) => {
        this.client = data;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  virement() {
    this.montantTransfertDto = this.montantTransfert.value;
    this.clientService.virement(this.idCompteDebiteur, this.idCompteCrediteur, this.montantTransfertDto).subscribe(
      (response) => {
        console.log(response)

        this.afficherMessage(response)
        this.getClientDebiteur(this.id);
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

    } else {
      if (error.error.response != undefined) {
        alert(error.error.response);
      } else {
        alert(error.error);
      }
    }
  }
}
