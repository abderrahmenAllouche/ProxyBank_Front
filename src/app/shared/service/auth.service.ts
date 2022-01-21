import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { UtilisateurAuth } from '../models/utilisateur-auth';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Utilisateur } from '../models/utilisateur.model';

@Injectable({ providedIn: 'root' })
export class AuthService {
  url: string;
  subjectConnexion: Subject<number>;

  //currentUser: UtilisateurDto;

  constructor(private router: Router, private http: HttpClient) {
    this.url = 'http://localhost:8080/auth/login';
    this.subjectConnexion = new Subject<number>();
  }

  isConnected(): boolean {
    return Boolean(localStorage.getItem('isConnected'));
  }

  getCurrentUser() : Utilisateur {
    const userStr: any = localStorage.getItem('current_user');
    return JSON.parse(userStr);
  }

  login(user: UtilisateurAuth): Observable<boolean> {
    return new Observable((observer) => {
      this.http.post(this.url, user).subscribe(
        (res: any) => {
          localStorage.setItem('isConnected', 'true');
          localStorage.setItem('access_token', res['token']);
          const currentUser: Utilisateur = {
            actif: true,
            username: '',
            role: '' ,
            password: '',
            id: 0,
          };
          const helper = new JwtHelperService();
        const decodedToken = helper.decodeToken(res['token']);
        currentUser.id = decodedToken.sub;
        currentUser.username = decodedToken.username;
        currentUser.password = decodedToken.password;
        currentUser.role = decodedToken.roles;
        localStorage.setItem('current_user', JSON.stringify(currentUser));
        this.subjectConnexion.next(3);
        
        observer.next(true);
      },
        err => {
          observer.next(false);
        },
        () => {
          observer.complete();
        });
    });

  }

  logout() {
    localStorage.removeItem('isConnected');
    localStorage.removeItem('accessToken');
    localStorage.removeItem('currentUser');
    this.subjectConnexion.next(3);
    this.router.navigateByUrl('/login');
  }
}
