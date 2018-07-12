import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { RequestOptions } from '@angular/http';
import { Globals } from '../../globals';

@Injectable()
export class HorasExtrasService {
  private headers = new HttpHeaders().set('Content-Type', 'application/json');
  constructor(private http: HttpClient, private global: Globals) { }

  getTurno(): Observable<any> {
    return this.http.get(this.global.urlAPI + 'turno/get');
  }

  DependienteSupervisor(data): Observable<any> {
    return this.http.get(this.global.urlAPI + 'dependientesupervisor/get/' + data);
  }

  ItemForApps(data): Observable<any> {
    return this.http.post(this.global.urlAPI + 'itemapps/getitemforapps', data);
  }

  saveHE(data): Observable<any> {
    return this.http.post(this.global.urlAPI + 'he/save', data);
  }

  getHE(): Observable<any> {
    return this.http.get(this.global.urlAPI + 'he/get');
  }
}
