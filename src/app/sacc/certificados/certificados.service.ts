import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { RequestOptions } from '@angular/http';
import { Globals } from '../../globals';


@Injectable()
export class CertificadosService {
  private headers = new HttpHeaders().set('Content-Type', 'application/json');
  private headerspdf = new HttpHeaders().set('Content-Type', 'application/json');
  private headers2 = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
  constructor(private http: HttpClient, private global: Globals) { }

  setCertificados(data): Observable<any> {
    return this.http.post(this.global.urlAPI + 'sacccertificadoanalisis/save', data);
  }

  setCertificadosMP(data): Observable<any> {
    return this.http.post(this.global.urlAPI + 'sacccertificadoanalisis/saveMP', data);
  }

  getCertificados() {
    return this.http.get(this.global.urlAPI + 'sacccertificadoanalisis/pt');
  }

  getCertificadosPT() {
    return this.http.get(this.global.urlAPI + 'sacccertificadoanalisis/pt');
  }

  getCertificadosMP() {
    return this.http.get(this.global.urlAPI + 'sacccertificadoanalisis/mp');
  }

  getCertificado(data) {
    return this.http.get(this.global.urlAPI + 'sacccertificadoanalisis/get/' + data);
  }

  getCertificadoPorLote(data) {
    let codigo: string = data;
    return this.http.get(this.global.urlAPI + 'sacccertificadoanalisis/getl/' + codigo.replace('/', '['));
  }

  getReporteCertificados(data): Observable<any> {
    return this.http.post(this.global.urlIntranet + 'reportessacc/reportept.php', data);
  }

  saveCertificadoCaracteristica(data): Observable<any> {
    return this.http.post(this.global.urlAPI + 'sacccertificadoanalisis/savec', data);
  }

  getCFCertificado(data) {
    return this.http.get(this.global.urlAPI + 'sacccertificadoanalisis/getCF/' + data);
  }

  getAQCertificado(data) {
    return this.http.get(this.global.urlAPI + 'sacccertificadoanalisis/getAQ/' + data);
  }

  getCMCertificado(data) {
    return this.http.get(this.global.urlAPI + 'sacccertificadoanalisis/getCM/' + data);
  }

  // Traer lote Materia Prima
  getLoteMP(data) {
    return this.http.get(this.global.urlAPISAP + 'lotesmp/' + data);
  }

  // Traer lote Producto Terminado
  getLotePT(data) {
    return this.http.get(this.global.urlAPISAP + 'lotespt/' + data);
  }

}
