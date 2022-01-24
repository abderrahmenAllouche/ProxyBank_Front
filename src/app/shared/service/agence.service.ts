import { HttpClient } from '@angular/common/http';
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

  constructor(private _http: HttpClient) {}

  getAgence() {
    return this._http.get<Agence[]>(this.apiUrl);
  }

  supprimerAgence(id: number) {
      console.log(`${this.apiUrl}/${id}`);
    return this._http.delete(`${this.apiUrl}/${id}`);
  }

  getAll(): Observable<any> {
    return this._http.get(this.apiUrl);
  }

  create(data:Agence) : Observable<any>{
      
    return this._http.post(this.apiUrl, data);
  }

  modifier(data:Agence, id:number) : Observable<any>{
    return this._http.put(`${this.apiUrl}/${id}`, data);
  }
  getById(id: any) {
    return this._http.get<Agence>(`${this.apiUrl}/${id}`);
    
     }
     getAudit(id : any) {
      return this._http.get<ClientSolde[]>(`${this.auditUrl}/${id}`);
    }
}
