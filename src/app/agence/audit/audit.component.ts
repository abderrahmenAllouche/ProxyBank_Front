import { Component, OnInit } from '@angular/core';
import { AgenceService } from 'src/app/shared/service/agence.service';
import {
  FormControl,
  FormGroup,
  FormBuilder,
  Validator,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Agence } from 'src/app/shared/models/agence.model';
import { ClientSolde } from 'src/app/shared/models/clientSolde.model';
import { Utilisateur } from 'src/app/shared/models/utilisateur.model';
import { AuthService } from 'src/app/shared/service/auth.service';
import { StorageService } from 'src/app/shared/service/storage.service';
import { Gerant } from 'src/app/shared/models/gerant.model';
import { GerantService } from 'src/app/shared/service/gerant.service';
@Component({
  selector: 'app-audit',
  templateUrl: './audit.component.html',
  styleUrls: ['./audit.component.css']
})
export class AuditComponent implements OnInit {
  public clientSoldes : Array<ClientSolde>
  public total: number;
  private gerant!: Gerant;
  private utilisateur!: Utilisateur
  private agence!: Agence;

  constructor(private gerantService: GerantService,private agenceService:AgenceService,private activatedRoute: ActivatedRoute,private storageService: StorageService,
    private authService: AuthService,
    private router: Router,


    ) {
     this.clientSoldes=[];
     this.total=0;
    }

    ngOnInit(): void {
      this.utilisateur = this.storageService.getUserFromLocalStorage();
      this.getAudit();


     }
     getAudit() {
      this.authService.getGerant(this.utilisateur.id).subscribe(
        (data) => {
          this.gerant = data;
          this.gerantService.getById(data.id).subscribe(
            (data2) => {
              this.agenceService.getById(data2.idAgence).subscribe(
                (data3) => {
                  this.agence = data3;
                  this.agenceService.getAudit(data3.id).subscribe(
                    (data) => {
                     this.clientSoldes=data;

                      console.log(data);
                      this.calculTotal();

                    },
                    (error) => {
                      console.log(error);
                    }
                  );
                }
              )
            }
          )
        },
        (error) => {
        }
      );

      }
      redirection(){
        this.router.navigate(['/audit'])
      }

      calculTotal(){
        this.clientSoldes.forEach(client => this.total=this.total+client.solde);
        console.log(this.total)
      }

}
