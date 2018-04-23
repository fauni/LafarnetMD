import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { RequestOptions } from '@angular/http';
import { Globals } from '../../globals';


@Injectable()
export class AsignacionService {
  private headers = new HttpHeaders().set('Content-Type', 'application/json');
  private headers2 = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
  constructor(private http: HttpClient, private global: Globals) { }

  getCaracteristicasForClasificacion(data) {
    return this.http.get(this.global.urlAPI + 'saccclasificacioncaracteristicas/get/' + data);
  }

  getCaracteristicasForProducto(data) {
    return this.http.get(this.global.urlAPI + 'saccproductosespecificacion/get/' + data);
  }

  getClasificacion(data) {
    return this.http.get(this.global.urlAPI + 'saccclasificacioncaracteristicas/clasificacion/' + data);
  }

  saveAsignacion(data) {
    return this.http.post(this.global.urlAPI + 'saccproductosespecificacion/save', data);
  }
}
