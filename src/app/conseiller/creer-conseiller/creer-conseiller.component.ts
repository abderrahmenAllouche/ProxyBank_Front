import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Conseiller } from 'src/app/shared/models/conseiller.model';
import { ConseillerService } from 'src/app/shared/service/conseiller.service';

@Component({
  selector: 'app-creer-conseiller',
  templateUrl: './creer-conseiller.component.html',
  styleUrls: ['./creer-conseiller.component.css']
})
export class CreerConseillerComponent implements OnInit {
  public conseillers: Array<Conseiller>;
  public conseiller!: FormGroup;

  constructor(
    private conseillerService: ConseillerService,
    private fb: FormBuilder,
    private router: Router,
  ) { 
    this.conseillers = [];
  }

  ngOnInit(): void {
    this.conseiller = this.fb.group({
      nom: ['', Validators.required],
      gerant_id: ['', Validators.required],
    });
  }

  creerConseiller(): void {
    const data = this.conseiller.value;
    this.conseillerService.create(data).subscribe(
      (response) => {
        console.log(response)
        this.getConseiller()
        this.afficherMessage(response)
        this.redirection();
      },
      (error) => {
        this.afficherMessage(error);
      }
    );
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

  afficherMessage(error: any) {
    console.log(error);
    if (error.response != undefined) {
      alert(error.response);
    }else{
      alert(error.error)
    } 
  }

  redirection(){
    this.router.navigate(['/conseillers'])
  }

}
