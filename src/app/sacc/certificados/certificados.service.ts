import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { RequestOptions } from '@angular/http';
import { Globals } from '../../globals';


@Injectable()
export class CertificadosService {
  private headers = new HttpHeaders().set('Content-Type', 'application/json');
  private headers2 = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
  constructor(private http: HttpClient, private global: Globals) { }

  setCertificados(data): Observable<any> {
    return this.http.post(this.global.urlAPI + 'sacccertificadoanalisis/save', data);
  }

  getCertificados() {
    return this.http.get(this.global.urlAPI + 'sacccertificadoanalisis/pt');
  }
}
