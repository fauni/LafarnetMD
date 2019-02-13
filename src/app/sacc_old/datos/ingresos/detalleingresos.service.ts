import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { RequestOptions } from '@angular/http';
import { Globals } from '../../../globals';

@Injectable()
export class DetalleIngresosService {
  private headers = new HttpHeaders().set('Content-Type', 'application/json');
  private headers2 = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
  constructor(private http: HttpClient, private global: Globals) { }

  getDetalleIngresos(): Observable<any> {
    return this.http.get(this.global.urlAPI + 'saccdetalleingresos/get');
  }
  getDetalleIngresosByCod(cod: string): Observable<any> {
    return this.http.get(this.global.urlAPI + 'saccdetalleingresos/get/' + cod);
  }

  setDetalleIngresos(data): Observable<any> {
    return this.http.post(this.global.urlAPI + 'saccdetalleingresos/save', data);
  }
}
