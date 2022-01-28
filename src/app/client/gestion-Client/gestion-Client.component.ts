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
import { Router } from '@angular/router';
import { CompteCourant } from 'src/app/shared/models/compteCourant.model';

@Component({
  selector: 'app-client',
  templateUrl: './gestion-Client.component.html',
  styleUrls: ['./gestion-Client.component.css'],
})
export class GestionClientComponent implements OnInit {
  public clients: Array<Client>;
  public client!: Client;

  public errorMessage!: string;
  public errorMessageModifier!: string;
  public idAModifer!: string;
  public isModifier!: false;

  constructor(private clientService: ClientService, private router: Router) {
    this.clients = [];
  }

  ngOnInit(): void {
    this.getClient();
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

  supprimerClient(id: number) {
    this.clientService.supprimerClient(id).subscribe(
      (response) => {
        console.log(response);
        this.getClient();
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

  redirection(id: number) {
    this.router.navigate(['/client', id]);
  }

  redirectionVirement(id: number) {
    this.router.navigate(['/virement', id]);
  }
}
