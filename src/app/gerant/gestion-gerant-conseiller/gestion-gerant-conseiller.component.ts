import { Component, OnInit } from '@angular/core';
import { GerantService } from 'src/app/shared/service/gerant.service';
import { Gerant } from 'src/app/shared/models/gerant.model';
import { Conseiller } from 'src/app/shared/models/conseiller.model';
import { Cons } from 'rxjs';
import { ConseillerService } from 'src/app/shared/service/conseiller.service';

@Component({
  selector: 'app-gestion-gerant-conseiller',
  templateUrl: './gestion-gerant-conseiller.component.html',
  styleUrls: ['./gestion-gerant-conseiller.component.css']
})
export class GestionGerantConseillerComponent implements OnInit {
  public conseillers!: Array<Conseiller>;
  public gerants!: Array<Gerant>;
  public gerantChoisie!: Gerant;
  
  constructor(private gerantService: GerantService,private conseillerService : ConseillerService ) { }

  ngOnInit(): void {
    this.getConseiller();
    this.getGerant();
  }

  getConseiller() {
    this.conseillerService.getAll().subscribe(
      (data) => {
        this.conseillers = data;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  getGerant() {
    this.gerantService.getAll().subscribe(
      (data) => {
        this.gerants = data;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  changerGerant(event : any, idConseiller :number){
    this.gerantChoisie = event;
    this.gerantService.assignerGerantConseiiler(this.gerantChoisie.id,idConseiller ).subscribe(
      (response) => {
        this.getConseiller();
        this.getGerant();
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
