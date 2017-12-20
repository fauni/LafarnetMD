import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { RequestOptions } from '@angular/http';

@Injectable()
export class LoginService {
  private headers = new HttpHeaders().set('Content-Type', 'application/json');
  constructor(private http: HttpClient) { }

  getUsuario() {
    return this.http.get('http://localhost:8888/newapilafarnet/public/usuario/get').toPromise();
  }

  getUsuarios(): Observable<any> {
    return this.http.get('http://localhost:8888/newapilafarnet/public/usuario/get');
  }

  login(data): Observable<any> {
    return this.http.post('http://localhost:8888/newapilafarnet/public/usuario/login', data);
  }

}
