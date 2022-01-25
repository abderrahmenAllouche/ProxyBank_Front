import { Component, OnInit } from '@angular/core';
import { GerantService } from 'src/app/shared/service/gerant.service';
import { Gerant } from 'src/app/shared/models/gerant.model';
import { Conseiller } from 'src/app/shared/models/conseiller.model';
import { ConseillerService } from 'src/app/shared/service/conseiller.service';

@Component({
  selector: 'app-gestion-gerant-conseiller',
  templateUrl: './gestion-gerant-conseiller.component.html',
  styleUrls: ['./gestion-gerant-conseiller.component.css']
})
export class GestionGerantConseillerComponent implements OnInit {
  public gerants!: Array<Gerant>;
  public conseillers!: Array<Conseiller>;
  public conseillerChoisi!: Conseiller;

  
  constructor(private gerantService: GerantService,private conseillerService: ConseillerService) { }

  ngOnInit(): void {
    this.getGerant();
    this.getConseiller();
  }

  getGerant() {
    this.gerantService.getGerant().subscribe(
      (data) => {
        console.log(data)
        this.gerants = data;
      },
      (error) => {
        console.log(error);
      }
    );
  }
  getConseiller() {
    this.conseillerService.getConseillerDisponible().subscribe(
      (data) => {
        console.log(data)
        this.conseillers = data;

      },
      (error) => {
        console.log(error);
      }
    );

  }
  changerConseiller(event: any, id_gerant: number) {
    this.conseillerChoisi = event;
    this.conseillerService.assignerConseillerGerant(this.conseillerChoisi.id, id_gerant).subscribe(
      (data) => {
        console.log(data)
        this.getGerant();
        this.getConseiller();
        this.afficherMessage(data);

      },
      (error) => {
        console.log(error);
      }
    );

}
afficherMessage(error: any) {
  if (error.response != undefined) {
    alert(error.response);
  } else {
    alert(error.error)
  }
}
}
function id(id: any, Number: NumberConstructor) {
  throw new Error('Function not implemented.');
}

