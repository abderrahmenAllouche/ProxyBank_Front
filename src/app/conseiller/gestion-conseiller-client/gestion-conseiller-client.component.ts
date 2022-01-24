import { Component, OnInit } from '@angular/core';
import { Conseiller } from 'src/app/shared/models/conseiller.model';
import { ConseillerService } from 'src/app/shared/service/conseiller.service';

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
  
  constructor(private conseillerService: ConseillerService) { }

  ngOnInit(): void {
    this.getConseiller();
    this.getConseillerDisponible();
  }

  getConseiller() {
    this.conseillerService.getConseiller(1).subscribe(
      (data : Array<Conseiller>) => {
        this.conseillers = data;
      },
      (error: string) => {
      }
    );
  }

  getConseillerDisponible(){
    this.conseillerService.getConseillerDisponible().subscribe(
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
        this.getConseiller();
        this.getConseillerDisponible();
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
