import { Component, OnInit } from '@angular/core';
import { Conseiller } from 'src/app/shared/models/conseiller.model';
import { Utilisateur } from 'src/app/shared/models/utilisateur.model';
import { AuthService } from 'src/app/shared/service/auth.service';
import { ConseillerService } from 'src/app/shared/service/conseiller.service';
import { StorageService } from 'src/app/shared/service/storage.service';

@Component({
  selector: 'app-gestion-conseiller-client',
  templateUrl: './gestion-conseiller-client.component.html',
  styleUrls: ['./gestion-conseiller-client.component.css']
})
export class GestionConseillerClientComponent implements OnInit {
  public conseillers!: Array<Conseiller>;
  public conseillersDiponible! : Array<Conseiller>;
  public conseillerChoisie!: Conseiller;
  public value!: any;



  utilisateur: Utilisateur = {
    id: 0,
    username: '',
    password: '',
    role: '',
    actif: false,
  };

  constructor(private conseillerService: ConseillerService, private storageService : StorageService,
    private authService: AuthService) { }

  ngOnInit(): void {
    this.utilisateur = this.storageService.getUserFromLocalStorage()

  if(this.utilisateur.role=="GERANT"){
    this.getConseiller(this.utilisateur.id);

      this.getConseillerDisponible(this.utilisateur.id);
      console.log(this.conseillers);
  }


  }

  getConseiller(id: any) {
    this.conseillerService.getConseiller(id).subscribe(
      (data : Array<Conseiller>) => {
        this.conseillers = data;

      },
      (error: string) => {
      }
    );
  }

  getConseillerDisponible(id: any){
    this.conseillerService.getConseillerDisponible(id).subscribe(
      (data) => {
        this.conseillersDiponible = data;
      },
      (error) => {
      }
    );
  }

  changerConseiller(event : any, idClient :number){
    this.conseillerChoisie = event;
    this.conseillerService.assignerClient(this.conseillerChoisie.id,idClient ).subscribe(
      (response) => {
        this.getConseiller(this.utilisateur.id);
        this.getConseillerDisponible(this.utilisateur.id);
        this.afficherMessage(response)
      },
      (error) => {
      }
    );

  }

  afficherMessage(error: any) {
    if (error.response != undefined) {
      alert(error.response);
    }else{
      alert(error.error)
    }
  }


}
