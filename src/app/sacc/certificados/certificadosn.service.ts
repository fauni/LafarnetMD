import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Http, Response, Headers, RequestMethod } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { RequestOptions } from '@angular/http';
import { Globals } from '../../globals';


@Injectable()
export class CertificadosnService {
  
  private headers = new HttpHeaders().set('Content-Type', 'application/json');
  private headerspdf = new HttpHeaders().set('Content-Type', 'application/json');
  private headers2 = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
  constructor(private http: HttpClient, private _http: Http, private global: Globals) { }
  
  getCertificadoAnalisisMP(codigo) {
    return this.http.get(this.global.urlAPICORE + 'certificadoanalisismp/' + codigo);
  }

  getCaracteristicasCertificado(codigo) {
    return this.http.get(this.global.urlAPICORE + 'caracteristicascertificado/' + codigo);
  }

  getCertificadoMPPDF(data) {
    const responseType: 'json' | 'arraybuffer' | 'blob' | 'text' = 'json';
    return this.http.get(this.global.urlAPICORE + 'certificadomp/' + data, { responseType:'arraybuffer' });
  }

  getCertificadoPTPDF(data) {
    const responseType: 'json' | 'arraybuffer' | 'blob' | 'text' = 'json';
    return this.http.get(this.global.urlAPICORE + 'certificadopt/' + data, { responseType:'arraybuffer' });
  }

  /*saveCaracteristicaCertificado(data): Observable<any> {
    const responseType: 'json' | 'arraybuffer' | 'blob' | 'text' = 'json';
    var body = JSON.stringify(data);
    var headerOptions = new Headers({'Content-Type':'application/json'});
    var requestOptions = new RequestOptions({method : RequestMethod.Post,headers : headerOptions});
    return this._http.post(this.global.urlAPICORE + 'caracteristicascertificado/', body, requestOptions);
  }*/
  saveCaracteristicaCertificado(data): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json'}),
      withCredentials: true
    }
    return this.http.post(this.global.urlAPICORE + 'caracteristicascertificado/', data);
  }

  anularCertificado(codigo) {
    return this.http.get(this.global.urlAPICORE + 'certificadoanalisis/' + codigo);
  }
}
