import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Cons, Observable } from 'rxjs';
import { Conseiller } from 'src/app/shared/models/conseiller.model';
import { Gerant } from '../models/gerant.model';
import { NewUtilisateur } from '../models/newUtilisateur.model';
import { Utilisateur } from '../models/utilisateur.model';
import { AuthService } from './auth.service';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root',
})
export class ConseillerService {
  apiUrl = 'http://localhost:8080/ProxyBank/conseiller';
  url = 'http://localhost:8080/ProxyBank';
  disponileUrl ='http://localhost:8080/ProxyBank/conseiller/disponible'
  createUrl = 'http://localhost:8080/admin/user'
  utilisateur!: Utilisateur;
  conseiller!: Conseiller;
  gerant!: Gerant;
  

  constructor(private _http: HttpClient,private authService : AuthService, private storageService : StorageService) {
  }


  
  getAll(): Observable<any> {
    return this._http.get(this.apiUrl, {
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin': '*',
        Authorization: 'Bearer ' + localStorage.getItem('access_token'),
      })
    });
  }

  getConseiller(id : number) {
    
    return this._http.get<Conseiller[]>(`${this.url}/gerant/${id}/conseillers`, {
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin': '*',
        Authorization: 'Bearer ' + localStorage.getItem('access_token'),
      })
    });

  }

  getById(id: any) {
    return this._http.get<Conseiller>(`${this.apiUrl}/${id}`, {
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin': '*',
        Authorization: 'Bearer ' + localStorage.getItem('access_token'),
      })
    });
  }

  getConseillerDisponible(id: any) {
    return this._http.get<Conseiller[]>(`${this.disponileUrl}/${id}`, {
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin': '*',
        Authorization: 'Bearer ' + localStorage.getItem('access_token'),
      })
    });
  }

  supprimerConseiller(id: number) {
    return this._http.delete(`${this.apiUrl}/${id}`, {
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin': '*',
        Authorization: 'Bearer ' + localStorage.getItem('access_token'),
      })
    });
  }

  create(data: NewUtilisateur): Observable<any> {
    return this._http.post(this.createUrl, data, {
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin': '*',
        Authorization: 'Bearer ' + localStorage.getItem('access_token'),
      })
    });
  }

  modifier(data: Conseiller, id: number): Observable<any> {
    return this._http.put(`${this.apiUrl}/${id}`, data, {
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin': '*',
        Authorization: 'Bearer ' + localStorage.getItem('access_token'),
      })
    });
  }

  assignerClient(idConseiller: number, idClient: number): Observable<any> {
    return this._http.put(`${this.apiUrl}/${idConseiller}/client/${idClient}`,null, {
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin': '*',
        Authorization: 'Bearer ' + localStorage.getItem('access_token'),
      })
    });
  }


}
