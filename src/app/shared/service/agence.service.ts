import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Agence } from '../models/agence.model';
import { ClientSolde } from '../models/clientSolde.model';
@Injectable({
  providedIn: 'root',
})
export class AgenceService {

  apiUrl = 'http://localhost:8080/ProxyBank/Agence';
  auditUrl = 'http://localhost:8080/ProxyBank/Audit'

  constructor(private _http: HttpClient) { }

  getAgence() {
    return this._http.get<Agence[]>(this.apiUrl, {
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin': '*',
        Authorization: 'Bearer ' + localStorage.getItem('access_token'),
      })
    });
  }

  supprimerAgence(id: number) {
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

  create(data: Agence): Observable<any> {

    return this._http.post(this.apiUrl, data, {
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin': '*',
        Authorization: 'Bearer ' + localStorage.getItem('access_token'),
      })
    });

  }

  modifier(data: Agence, id: number): Observable<any> {
    return this._http.put(`${this.apiUrl}/${id}`, data, {
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin': '*',
        Authorization: 'Bearer ' + localStorage.getItem('access_token'),
      })
    });
  }
  getById(id: any) {
    return this._http.get<Agence>(`${this.apiUrl}/${id}`, {
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin': '*',
        Authorization: 'Bearer ' + localStorage.getItem('access_token'),
      })
    });

  }
  getAudit(id: any) {
    return this._http.get<ClientSolde[]>(`${this.auditUrl}/${id}`, {
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin': '*',
        Authorization: 'Bearer ' + localStorage.getItem('access_token'),
      })
    });
  }
}
