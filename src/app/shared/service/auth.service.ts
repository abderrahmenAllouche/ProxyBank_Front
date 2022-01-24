import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UtilisateurAuth } from '../models/utilisateur-auth';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Utilisateur } from '../models/utilisateur.model';
import { Conseiller } from '../models/conseiller.model';
import { Gerant } from '../models/gerant.model';

@Injectable({ providedIn: 'root' })
export class AuthService {
  url: string;
  apiUrl: string;
  adminUrl : string;
  subjectConnexion: Subject<number>;

  //currentUser: UtilisateurDto;

  constructor(private router: Router, private http: HttpClient) {
    this.url = 'http://localhost:8080/auth/login';
    this.apiUrl ='http://localhost:8080/ProxyBank/'
    this.adminUrl = 'http://localhost:8080/admin/user'
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
    localStorage.removeItem('access_token');
    localStorage.removeItem('current_user');
    this.router.navigateByUrl('/login');
  }

  getGerant(id : number){
    return this.http.get<Gerant>(`${this.apiUrl}gerant/utilisateur/${id}`, {
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin': '*',
        Authorization: 'Bearer ' + localStorage.getItem('access_token'),
      })
    });
  }

  getConseiller(id :number){
    return this.http.get<Conseiller>(`${this.apiUrl}conseiller/utilisateur/${id}`, {
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin': '*',
        Authorization: 'Bearer ' + localStorage.getItem('access_token'),
      })
    });
  }

  getAll(): Observable<any> {
    return this.http.get(this.adminUrl, {
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin': '*',
        Authorization: 'Bearer ' + localStorage.getItem('access_token'),
      })
    });
  }
}
