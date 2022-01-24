import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Gerant } from '../models/gerant.model';

@Injectable({
  providedIn: 'root',
})
export class GerantService {
  apiUrl = 'http://localhost:8080/ProxyBank/Gerant';

  constructor(private _http: HttpClient) {}

  getGerant() {
    return this._http.get<Gerant[]>(this.apiUrl);
  }

  supprimerGerant(id: number) {
      console.log(`${this.apiUrl}/${id}`);
    return this._http.delete(`${this.apiUrl}/${id}`);
  }

  getAll(): Observable<any> {
    return this._http.get(this.apiUrl);
  }

  create(data:Gerant) : Observable<any>{
      
    return this._http.post(this.apiUrl, data);
  }

  modifier(data:Gerant, id:number) : Observable<any>{
    return this._http.put(`${this.apiUrl}/${id}`, data);
  }
  getById(id: any) {
    return this._http.get<Gerant>(`${this.apiUrl}/${id}`);
}
}
