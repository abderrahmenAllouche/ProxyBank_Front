import { Component, OnInit } from '@angular/core';
import { Agence } from 'src/app/shared/models/agence.model';
import { AgenceService } from 'src/app/shared/service/agence.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { GerantService } from 'src/app/shared/service/gerant.service';
import { Gerant } from 'src/app/shared/models/gerant.model';
import { getLocaleDateFormat } from '@angular/common';

@Component({
  selector: 'app-modifier-agence',
  templateUrl: './modifier-agence.component.html',
  styleUrls: ['./modifier-agence.component.css'],
})
export class ModifierAgenceComponent implements OnInit {
  public agence!: Agence;
  public agenceModifier!: FormGroup;
  public id!: string | null;

  constructor(
    private agenceService: AgenceService,
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      console.log(paramMap.get('id'));
      this.id = paramMap.get('id');
    });
    this.getAgenceById(this.id);

    this.agenceModifier = this.fb.group({
      nom: ['', Validators.required],
    });
  }
  getAgenceById(id: any) {
    this.agenceService.getById(id).subscribe(
      (data) => {
        this.agence = data;
        console.log(this.agence);
      },
      (error) => {
        console.log(error);
      }
    );
  }
  modifierAgence(id: number) {
    const data = this.agenceModifier.value;
    this.agenceService.modifier(data, id).subscribe(
      (response) => {
        console.log(response);
        this.getAgenceById(id);
        this.afficherMessage(response);
        this.redirection();
      },
      (error) => {
        this.afficherMessage(error);
      }
    );
  }
  afficherMessage(error: any) {
    console.log(error);
    if (error.response != undefined) {
      alert(error.response);
    } else {
      alert(error.error);
    }
  }
  redirection() {
    this.router.navigate(['/gestion-agences']);
  }
}
