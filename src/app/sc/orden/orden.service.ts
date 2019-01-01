import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Http, Response, Headers, RequestMethod } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { RequestOptions } from '@angular/http';
import { Globals } from '../../globals';


@Injectable()
export class OrdenService {
  private headers = new HttpHeaders().set('Content-Type', 'application/json');
  private headerspdf = new HttpHeaders().set('Content-Type', 'application/json');
  private headers2 = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
  constructor(private http: HttpClient, private _http: Http, private global: Globals) { }

  // Obtener Listado de Ordenes de Compra para Abastecimiento
  getOrdenCompraAbastecimiento() {
    return this.http.get(this.global.urlAPICORE + 'scordencomprax/');
  }


  // Guardar Orden de Compra
  saveOrdenCompra(data) {
    return this.http.post(this.global.urlAPICORE + 'scordencomprax/', data);
  }

  // Guardar Orden de Compra
  saveDetalleOrdenCompra(data) {
    return this.http.post(this.global.urlAPICORE + 'scdetalleordencompra/', data);
  }

  // Obtener Listado de Tipo de Compra y el nombre del Encargado
  getTipoOrdenCompraEncargado() {
    return this.http.get(this.global.urlAPICORE + 'sctipocompraencargado/');
  }

  getTipoOrdenCompraEncargadoSingle(data) {
    return this.http.get(this.global.urlAPICORE + 'sctipocompraencargado/' + data);
  }

  // Obtener conversaciones de la solicitud
  getConversacionesXOrden(data) {
    return this.http.get(this.global.urlAPICORE + 'scconversacionorden/' + data);
  }

  // Enviar mensaje (Guardar conversación)
  saveConversacionOrden(data) {
    return this.http.post(this.global.urlAPICORE + 'scconversacionorden/', data);
  }

  // Obtener orden de compra por codigo de orden
  getOrdenXCodigo(data) {
    return this.http.get(this.global.urlAPICORE + 'scordencomprax/' + data);
  }

  // Obtener detalle de orden de compra por codigo de orden
  getDetalleOrdenXCodigo(data) {
    return this.http.get(this.global.urlAPICORE + 'scdetalleordencompra/' + data);
  }
}






