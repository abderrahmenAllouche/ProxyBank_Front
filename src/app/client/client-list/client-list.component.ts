import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Client } from 'src/app/shared/models/client.model';
import { Utilisateur } from 'src/app/shared/models/utilisateur.model';
import { AuthService } from 'src/app/shared/service/auth.service';
import { ClientService } from 'src/app/shared/service/client.service';
import { StorageService } from 'src/app/shared/service/storage.service';

@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.css']
})
export class ClientListComponent implements OnInit {
  private utilisateur! : Utilisateur
  public clients: Array<Client>;


  constructor(private router : Router, private authService : AuthService,private storageService : StorageService,private clientService : ClientService) {
    this.clients=[]
  }

  ngOnInit(): void {
    this.getClientByConseillerId();
  }

  getClientByConseillerId() {
    this.utilisateur = this.storageService.getUserFromLocalStorage();
    this.authService.getConseiller(this.utilisateur.id).subscribe(
      (data) => {
        this.clientService.getClientByConseillerId(data.id).subscribe(
          (data) => {
            console.log(data)
            this.clients = data;

          },
          (error) => {
          }
        );
      },
      (error) => {
      }
    );
  }


  redirection(){
    this.router.navigate(['home'])
  }
  ajouter(){
    this.router.navigate(['/client/new'])
  }
  redirectionClient(id: number) {
    this.router.navigate(['/client', id]);
  }

}
