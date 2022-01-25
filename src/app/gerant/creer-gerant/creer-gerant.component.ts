import { Component, OnInit } from '@angular/core';
import { Gerant } from 'src/app/shared/models/gerant.model';
import { GerantService } from '../../shared/service/gerant.service';
import {
  FormControl,
  FormGroup,
  FormBuilder,
  Validator,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { NewUtilisateur } from 'src/app/shared/models/newUtilisateur.model';
import { AuthService } from 'src/app/shared/service/auth.service';

@Component({
  selector: 'app-creer-gerant',
  templateUrl: './creer-gerant.component.html',
  styleUrls: ['./creer-gerant.component.css'],
})
export class CreerGerantComponent implements OnInit {
  
  public gerants!: Array<Gerant>;
  public gerant!: FormGroup;
  public newUtilisateur!: FormGroup;
  private utilisateurModel: NewUtilisateur = { 
    username: '',
    password: '',
    nom: '',
    role:'',
    superieurId:0
  };

  constructor( private gerantService:GerantService,
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {
  this.gerants = [];
  }     

  ngOnInit(): void {
    this.gerant = this.fb.group({
      nom: ['', Validators.required],
      agence_id: ['', Validators.required],
    });
    this.newUtilisateur = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });


   }
   creerGerant(): void {
    const newdata = this.gerant.value;
    const utilisateurdata = this.newUtilisateur.value
    this.utilisateurModel.username = utilisateurdata.username.toString();
    this.utilisateurModel.password = utilisateurdata.password.toString();
    this.utilisateurModel.nom = newdata.nom;
    this.utilisateurModel.superieurId =newdata.agence_id;
    this.utilisateurModel.role ="GERANT"
    this.gerantService.create(this.utilisateurModel).subscribe(
      (response) => {
        this.getGerant()
        this.afficherMessage(response)
        this.redirection();
      },
      (error) => {
        this.afficherMessage(error);
      }
    ); 
  }

  getGerant() {
    this.gerantService.getAll().subscribe(
      (data) => {
       
        console.log(data);
        this.gerants = data;
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
      this.router.navigate(['/gerants'])
    }
}
