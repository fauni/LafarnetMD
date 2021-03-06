import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { RequestOptions } from '@angular/http';
import { Globals } from '../../../globals';

@Injectable()
export class ProveedoresService {
  private headers = new HttpHeaders().set('Content-Type', 'application/json');
  private headers2 = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
  constructor(private http: HttpClient, private global: Globals) { }

  getProveedores(): Observable<any> {
     return this.http.get(this.global.urlAPISAP + 'proveedores');
  }
  getProveedor(codp): Observable<any> {
    return this.http.get(this.global.urlAPISAP + 'proveedores/' + codp);
  }

  getFabricantes(): Observable<any> {
    return this.http.get(this.global.urlAPICORE + 'fabricante');
  }

  saveFabricante(data): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json'}),
      withCredentials: true
    }
    return this.http.post(this.global.urlAPICORE + 'fabricante/', data);
  }
}
