import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Http, Response, Headers, RequestMethod } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { RequestOptions } from '@angular/http';
import { Globals } from '../../globals';


@Injectable()
export class SolicitudService {
  private headers = new HttpHeaders().set('Content-Type', 'application/json');
  private headerspdf = new HttpHeaders().set('Content-Type', 'application/json');
  private headers2 = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
  constructor(private http: HttpClient, private _http: Http, private global: Globals) { }

  getProveedoresSC() {
    return this.http.get(this.global.urlAPICORE + 'scproveedor/');
  }

  getItemArticuloSC() {
    return this.http.get(this.global.urlAPICORE + 'scitemarticulo/');
  }

  getSolicitudCompraSolicitante(username) {
    return this.http.get(this.global.urlAPICORE + 'certificadoanalisismp/' + username);
  }

  getSolicitudXCodigo(data) {
    return this.http.get(this.global.urlAPICORE + 'scsolicitud/' + data);
  }

  saveSolicitudCompra(data): Observable<any> {
    return this.http.post(this.global.urlAPICORE + 'solicitudcompra/', data);
  }

  // Funciones Guardar Detalle de Solicitud de Compra
  saveDetalleSolicitudCompra(data): Observable<any> {
    return this.http.post(this.global.urlAPICORE + 'scdetallesolicitud/', data);
  }

  getDetalleSolicitudXCodigo(data) {
    return this.http.get(this.global.urlAPICORE + 'scdetallesolicitud/' + data);
  }

  // Funciones para Listado de Solicitud por usuario
  getListadoSolicitudXUsuario(data) {
    return this.http.get(this.global.urlAPICORE + 'solicitudcompra/' + data);
  }

  // Funciones para Listado de Solicitud por usuario
  getListadoSolicitudXAutorizador(data) {
    return this.http.get(this.global.urlAPICORE + 'scsolicitudautorizador/' + data);
  }

  // Funciones para Listado de Solicitud para convertir en Orden de Compra
  getListadoSolicitudXAbastecimiento(data) {
    return this.http.get(this.global.urlAPICORE + 'scsolicitudabastecimiento/');
  }

  // Subir archivos adjuntos para la solicitud
  uploadFilesSolicitud(data) {
    return this.http.post(this.global.urlAPICORE + 'scfilessolicitudcompra', data);
  }

  saveUploadFilesSolicitud(data, codigo) {
    return this.http.put(this.global.urlAPICORE + 'scfilessolicitudcompra/' + codigo, data);
  }

  // Obtener conversaciones de la solicitud
  getConversacionesXSolicitud(data) {
    return this.http.get(this.global.urlAPICORE + 'scconversacionsolicitud/' + data);
  }
  // Enviar mensaje (Guardar conversación)
  saveConversacionSolicitud(data) {
    return this.http.post(this.global.urlAPICORE + 'scconversacionsolicitud/', data);
  }
}






