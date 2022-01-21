import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/service/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  admin: boolean;
  gerant: boolean;
  conseiller: boolean;

  constructor() { 
    this.admin=true;
    this.gerant=false;
    this.conseiller=false;
  }
  ngOnInit(): void {
  }

}
