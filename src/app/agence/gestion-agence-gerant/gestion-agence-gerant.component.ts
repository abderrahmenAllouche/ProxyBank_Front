import { Component, OnInit } from '@angular/core';
import { AgenceService } from 'src/app/shared/service/agence.service';
import { Agence } from 'src/app/shared/models/agence.model';
import { Gerant } from 'src/app/shared/models/gerant.model';
import { GerantService } from 'src/app/shared/service/gerant.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-gestion-agence-gerant',
  templateUrl: './gestion-agence-gerant.component.html',
  styleUrls: ['./gestion-agence-gerant.component.css'],
})
export class GestionAgenceGerantComponent implements OnInit {
  public agences!: Array<Agence>;
  public gerants!: Array<Gerant>;
  public gerantChoisi!: Gerant;

  constructor(
    private agenceService: AgenceService,
    private gerantService: GerantService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getAgence();
    this.getGerant();
  }

  getAgence() {
    this.agenceService.getAgence().subscribe(
      (data) => {
        console.log(data);
        this.agences = data;
      },
      (error) => {
        console.log(error);
      }
    );
  }
  getGerant() {
    this.gerantService.getGerant().subscribe(
      (data) => {
        console.log(data);
        this.gerants = data;
      },
      (error) => {
        console.log(error);
      }
    );
  }
  changerGerant(event: any, id_agence: number) {
    this.gerantChoisi = event;
    this.gerantService
      .assignerGerantAgence(this.gerantChoisi.id, id_agence)
      .subscribe(
        (data) => {
          console.log(data);
          this.getAgence();
          this.getGerant();
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
      alert(error.error);
    }
  }
  redirection() {
    this.router.navigate(['/gestion-agences-gerants']);
  }
}
