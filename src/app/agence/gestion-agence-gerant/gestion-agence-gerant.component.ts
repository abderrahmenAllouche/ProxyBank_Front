import { Component, OnInit } from '@angular/core';
import { AgenceService } from 'src/app/shared/service/agence.service';
import { Agence } from 'src/app/shared/models/agence.model';

@Component({
  selector: 'app-gestion-agence-gerant',
  templateUrl: './gestion-agence-gerant.component.html',
  styleUrls: ['./gestion-agence-gerant.component.css']
})
export class GestionAgenceGerantComponent implements OnInit {
  public agences!: Array<Agence>;
  
  constructor(private agenceService: AgenceService) { }

  ngOnInit(): void {
    this.getAgence();
  }

  getAgence() {
    this.agenceService.getAgence().subscribe(
      (data) => {
        console.log(data)
        this.agences = data;
      },
      (error) => {
        console.log(error);
      }
    );
  }


}
