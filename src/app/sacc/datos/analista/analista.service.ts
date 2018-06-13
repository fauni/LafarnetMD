import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { RequestOptions } from '@angular/http';
import { Globals } from '../../../globals';

@Injectable()
export class AnalistasService {
  private headers = new HttpHeaders().set('Content-Type', 'application/json');
  private headers2 = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
  constructor(private http: HttpClient, private global: Globals) { }

  getAnalistas(): Observable<any> {
    return this.http.get(this.global.urlAPI + 'analista/get');
  }

  setAnalistas(data): Observable<any> {
    return this.http.post(this.global.urlAPI + 'analista/save', data);
  }

  getAnalistaForCode(data): Observable<any> {
    return this.http.get(this.global.urlAPI + 'analista/get/' + data);
  }
  getAnalistaForUserName(data): Observable<any> {
    return this.http.get(this.global.urlAPI + 'analista/getbyusrnm/' + data);
  }
  borranalista(data): Observable<any> {
    return this.http.delete(this.global.urlAPI + 'analista/delete/' + data);
  }
}
