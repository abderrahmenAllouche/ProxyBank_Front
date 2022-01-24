import { Component, OnInit } from '@angular/core';
<<<<<<< HEAD
import { Router } from '@angular/router';
=======
import { AuthService } from '../shared/service/auth.service';
>>>>>>> dc8a2f38fa49947978fb2ff11769486531dfbef6

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  admin: boolean;
  gerant: boolean;
  conseiller: boolean;


  constructor(private router:Router) { 
    this.admin=true;
    this.gerant=false;
    this.conseiller=false;
  }
  ngOnInit(): void {
  }
    redirectionAudit(id : number){
      console.log(id)
      this.router.navigate(['/audit',id])
}
}
