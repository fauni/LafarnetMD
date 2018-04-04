import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { RequestOptions } from '@angular/http';
import { Globals } from '../../../globals';

@Injectable()
export class IngresosService {
  private headers = new HttpHeaders().set('Content-Type', 'application/json');
  private headers2 = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
  constructor(private http: HttpClient, private global: Globals) { }

  getIngresos(): Observable<any> {
    return this.http.get(this.global.urlAPI + 'saccingresos/get');
  }
  getIngreso(id): Observable<any> {
    return this.http.get(this.global.urlAPI + 'saccingresos/get/  ' + id);
  }
  setIngresos(data): Observable<any> {
    return this.http.post(this.global.urlAPI + 'saccingresos/save', data);
  }
}
