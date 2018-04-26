import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { RequestOptions } from '@angular/http';
import { Globals } from '../../../globals';

@Injectable()
export class ClasificacionCaracteristicaService {
  private headers = new HttpHeaders().set('Content-Type', 'application/json');
  private headers2 = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
  constructor(private http: HttpClient, private global: Globals) { }

  getClasificacionCaracteristicaBytipoclas(id: string): Observable<any> {
    return this.http.get(this.global.urlAPI + 'clasificacion_caracteristica/getbytipoclas/' + id);
  }
  getClasificacionCaracteristicaCFAQCM(): Observable<any> {
    return this.http.get(this.global.urlAPI + 'clasificacion_caracteristica/GetAlljoinCFAQCM');
  }
  insertClasificacionCaracteristica(data): Observable<any> {
    return this.http.post(this.global.urlAPI + 'saccclasificacioncaracteristicas/save' , data);
  }
  updateClasificacionCaracteristica (data): Observable<any> {
    return this.http.put(this.global.urlAPI + 'saccclasificacioncaracteristicas/edit' , data);
  }
}
