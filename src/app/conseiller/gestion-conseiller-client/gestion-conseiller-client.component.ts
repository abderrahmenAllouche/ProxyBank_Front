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
  
  
  constructor(private conseillerService: ConseillerService) { }

  ngOnInit(): void {
    this.getConseiller();
  }

  getConseiller() {
    this.conseillerService.getConseiller().subscribe(
      (data) => {
        console.log(data)
        this.conseillers = data;
      },
      (error) => {
        console.log(error);
      }
    );
  }


}
