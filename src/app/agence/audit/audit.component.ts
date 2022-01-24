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
@Component({
  selector: 'app-audit',
  templateUrl: './audit.component.html',
  styleUrls: ['./audit.component.css']
})
export class AuditComponent implements OnInit {
  public id! : string | null;
  public clientSoldes : Array<ClientSolde>
  constructor(private agenceService:AgenceService,private activatedRoute: ActivatedRoute,
    
    ) { 
     this.clientSoldes=[];
    }

    ngOnInit(): void {
      this.activatedRoute.paramMap.subscribe( (paramMap: ParamMap) =>{
        console.log(paramMap.get('id'))
        this.id = paramMap.get('id')
      });
      this.getAudit();
     
  
     }
     getAudit() {
      this.agenceService.getAudit(this.id).subscribe(
        (data) => {
         this.clientSoldes=data;
          console.log(data);
          
        },
        (error) => {
          console.log(error);
        }
      );
  
      }


}
