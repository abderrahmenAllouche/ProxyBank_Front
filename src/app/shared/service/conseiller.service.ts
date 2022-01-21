import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Conseiller } from 'src/app/shared/models/conseiller.model';

@Injectable({
  providedIn: 'root',
})
export class ConseillerService {
  apiUrl = 'http://localhost:8080/ProxyBank/conseiller';
  url = 'http://localhost:8080/ProxyBank/gerant/4/conseillers';

  constructor(private _http: HttpClient) {}

  getAll(): Observable<any> {
    return this._http.get(this.apiUrl, {
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin': '*',
        Authorization: 'Bearer ' + localStorage.getItem('access_token'),
      })
    });
  }

  getConseiller() {
    return this._http.get<Conseiller[]>(this.url, {
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

  supprimerConseiller(id: number) {
    console.log(`${this.apiUrl}/${id}`);
    return this._http.delete(`${this.apiUrl}/${id}`, {
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin': '*',
        Authorization: 'Bearer ' + localStorage.getItem('access_token'),
      })
    });
  }

  create(data: Conseiller): Observable<any> {
    return this._http.post(this.apiUrl, data, {
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
}
