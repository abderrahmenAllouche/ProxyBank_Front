import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Gerant } from '../models/gerant.model';
import { NewUtilisateur } from '../models/newUtilisateur.model';

@Injectable({
  providedIn: 'root',
})
export class GerantService {
  apiUrl = 'http://localhost:8080/ProxyBank/Gerant';

  assigneUrl = 'http://localhost:8080/ProxyBank/gerant';
createUrl = 'http://localhost:8080/admin/user'

  constructor(private _http: HttpClient) { }

  getGerant() {
    return this._http.get<Gerant[]>(this.apiUrl, {
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin': '*',
        Authorization: 'Bearer ' + localStorage.getItem('access_token'),
      })
    });
  }

  supprimerGerant(id: number) {
    console.log(`${this.apiUrl}/${id}`);
    return this._http.delete(`${this.apiUrl}/${id}`, {
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin': '*',
        Authorization: 'Bearer ' + localStorage.getItem('access_token'),
      })
    });
  }

  getAll(): Observable<any> {
    return this._http.get(this.apiUrl, {
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin': '*',
        Authorization: 'Bearer ' + localStorage.getItem('access_token'),
      })
    });
  }

  create(data: NewUtilisateur): Observable<any> {

    return this._http.post(this.createUrl, data,
      {
        headers: new HttpHeaders({
          'Access-Control-Allow-Origin': '*',
          Authorization: 'Bearer ' + localStorage.getItem('access_token'),
        })
      });


  }

  modifier(data: Gerant, id: number): Observable<any> {
    return this._http.put(`${this.apiUrl}/${id}`, data, {
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin': '*',
        Authorization: 'Bearer ' + localStorage.getItem('access_token'),
      })
    });
  }
  getById(id: any) {
    return this._http.get<Gerant>(`${this.apiUrl}/${id}`, {
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin': '*',
        Authorization: 'Bearer ' + localStorage.getItem('access_token'),
      })
    });
  }
  assignerGerantAgence(id_gerant: number, id_agence: number) {
    return this._http.put(`${this.assigneUrl}/${id_gerant}/agence/${id_agence}`, null, {
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin': '*',
        Authorization: 'Bearer ' + localStorage.getItem('access_token'),
      })
    });
  }
}
