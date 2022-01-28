import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Conseiller } from 'src/app/shared/models/conseiller.model';
import { Utilisateur } from 'src/app/shared/models/utilisateur.model';
import { ConseillerService } from 'src/app/shared/service/conseiller.service';
import { StorageService } from 'src/app/shared/service/storage.service';

@Component({
  selector: 'app-modification-conseiller',
  templateUrl: './modification-conseiller.component.html',
  styleUrls: ['./modification-conseiller.component.css']
})
export class ModificationConseillerComponent implements OnInit {
  public conseillerModifier!: FormGroup;
  public conseiller: Conseiller= {
    id:0,
    nom: '',
    clients: new Array,
    gerant_id: 0
  };
  public id!: string | null ;
  private utilisateur! : Utilisateur


  constructor(
    private conseillerService: ConseillerService,
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private storageService: StorageService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.utilisateur = this.storageService.getUserFromLocalStorage()
    this.activatedRoute.paramMap.subscribe( (paramMap: ParamMap) =>{
      this.id = paramMap.get('id')
    });

    this.getConseillerById(this.id);

    this.conseillerModifier = this.fb.group({
      nom: ['', Validators.required],
      gerant_id: ['', Validators.required],
    });
  }


  getConseillerById(id : any) {
    this.conseillerService.getById(id).subscribe(
      (data) => {
        console.log(data.clients)
        this.conseiller = data;
      },
      (error) => {
      }
    );
  }

  modifierConseiller(id: number) {
    const data = this.conseillerModifier.value;
    this.conseillerService.modifier(data, id).subscribe(
      (response) => {
        this.getConseillerById(id);
        this.afficherMessage(response)
      },
      (error) => {
        this.afficherMessage(error);
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


  redirection(){
  if(this.utilisateur.role=='ADMIN'){
    this.router.navigate(['/admin/gestion-conseillers'])
  }else{
    this.router.navigate(['/conseillers'])
  }
  }
  redirectionClient(id: number) {
    this.router.navigate(['/client', id]);
  }
}
