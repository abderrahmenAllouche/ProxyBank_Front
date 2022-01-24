import { Client } from './../models/client.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  apiUrl = 'http://localhost:8080/ProxyBank/Client';

  constructor(private _http: HttpClient) {}

  getConseiller() {
    return this._http.get<Client[]>(this.apiUrl);
  }

  supprimerClient(id: number) {
      console.log(`${this.apiUrl}/${id}`);
    return this._http.delete(`${this.apiUrl}/${id}`);
  }

  getAll(): Observable<any> {
    return this._http.get(this.apiUrl);
  }

  create(data:Client) : Observable<any>{

    return this._http.post(this.apiUrl, data);
  }

  modifier(data:Client, id:number) : Observable<any>{
    return this._http.put(`${this.apiUrl}/${id}`, data);
  }
}
