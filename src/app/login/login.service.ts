import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { RequestOptions } from '@angular/http';
import { Globals } from '../globals';

@Injectable()
export class LoginService {
  private headers = new HttpHeaders().set('Content-Type', 'application/json');
  constructor(private http: HttpClient, private global: Globals) { }

  getUsuario() {
    return this.http.get(this.global.urlAPI + 'usuario/get').toPromise();
  }

  getUsuarios(): Observable<any> {
    return this.http.get(this.global.urlAPI + 'usuario/get');
  }

  login(data): Observable<any> {
    return this.http.post(this.global.urlAPI + 'usuario/login', data);
  }

}
