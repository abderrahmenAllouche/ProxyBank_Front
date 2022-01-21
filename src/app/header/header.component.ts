import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/service/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  public titleActive: string = '';
  public role: string = '';
  public isConnected: boolean = false;

  constructor(private authService: AuthService) { 
    this.role = 'conseiller';
  }

  
  ngOnInit(): void {
    if (localStorage.getItem('isConnected') === 'true') {
      this.isConnected = true;
    } else {
      this.isConnected = false;
    }
  }

  logout() {
    this.authService.logout();
  }
}
