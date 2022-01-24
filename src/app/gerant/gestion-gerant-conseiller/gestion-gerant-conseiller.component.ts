import { Component, OnInit } from '@angular/core';
import { GerantService } from 'src/app/shared/service/gerant.service';
import { Gerant } from 'src/app/shared/models/gerant.model';

@Component({
  selector: 'app-gestion-gerant-conseiller',
  templateUrl: './gestion-gerant-conseiller.component.html',
  styleUrls: ['./gestion-gerant-conseiller.component.css']
})
export class GestionGerantConseillerComponent implements OnInit {
  public gerants!: Array<Gerant>;
  
  constructor(private gerantService: GerantService) { }

  ngOnInit(): void {
    this.getGerant();
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


}
