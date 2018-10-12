import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Globals } from '../../../../globals';
import { SafeUrl } from '@angular/platform-browser';
import { Certificados } from '../../certificados';
import { CertificadosService } from '../../certificados.service';
import { HttpErrorResponse } from '@angular/common/http';
import * as jsPDF from 'jspdf';


@Component({
  selector: 'app-listcertificadosmp',
  templateUrl: './listcertificadosmp.component.html',
  styleUrls: ['./listcertificadosmp.component.scss']
})
export class ListcertificadosmpComponent implements OnInit {
  private imgSafe: SafeUrl; // Imagen del Reporte Logo Lafar
  certificados: Array<Certificados>;
  certificado: Certificados;

  filter: any;

  // Ordenacion
  key: string = 'codigo_certificado';
  reverse: boolean = false;

  // Datos Harcode
  lcf: any = [
    {
      'codigo_producto': 'PT100060',
      'id_caracteristica': '1',
      'especificacion': 'Suspension liquida prueba numero un y luego continuaremos con la dos prueba de eso es que funciona correctamente',
      'estado': '1',
      'tipo_caracteristica': 'CF',
      'usuario_creacion': 'faruni',
      'fecha_creacion': '2018-04-05 15:07:43',
      'usuario_modificacion': 'faruni',
      'fecha_modificacion': '2018-04-05 15:07:43'
    },
    {
      'codigo_producto': 'PT100060',
      'id_caracteristica': '1',
      'especificacion': 'Suspension ',
      'estado': '1',
      'tipo_caracteristica': 'CF',
      'usuario_creacion': 'faruni',
      'fecha_creacion': '2018-04-05 15:07:43',
      'usuario_modificacion': 'faruni',
      'fecha_modificacion': '2018-04-05 15:07:43'
    },
    {
      'codigo_producto': 'PT100060',
      'id_caracteristica': '1',
      'especificacion': 'Esto sirve para hacer una prueba de tamaño cabe recalcar que muchos de nosotros',
      'estado': '1',
      'tipo_caracteristica': 'CF',
      'usuario_creacion': 'faruni',
      'fecha_creacion': '2018-04-05 15:07:43',
      'usuario_modificacion': 'faruni',
      'fecha_modificacion': '2018-04-05 15:07:43'
    },
    {
      'codigo_producto': 'PT100060',
      'id_caracteristica': '1',
      'especificacion': 'Suspension liquida homogenea',
      'estado': '1',
      'tipo_caracteristica': 'CF',
      'usuario_creacion': 'faruni',
      'fecha_creacion': '2018-04-05 15:07:43',
      'usuario_modificacion': 'faruni',
      'fecha_modificacion': '2018-04-05 15:07:43'
    },
    {
      'codigo_producto': 'PT100060',
      'id_caracteristica': '1',
      'especificacion': 'Y esto tambien nos sirve para que podamos ver que tambien',
      'estado': '1',
      'tipo_caracteristica': 'CF',
      'usuario_creacion': 'faruni',
      'fecha_creacion': '2018-04-05 15:07:43',
      'usuario_modificacion': 'faruni',
      'fecha_modificacion': '2018-04-05 15:07:43'
    },
    {
      'codigo_producto': 'PT100060',
      'id_caracteristica': '1',
      'especificacion': 'Suspension liquida homogenea',
      'estado': '1',
      'tipo_caracteristica': 'CF',
      'usuario_creacion': 'faruni',
      'fecha_creacion': '2018-04-05 15:07:43',
      'usuario_modificacion': 'faruni',
      'fecha_modificacion': '2018-04-05 15:07:43'
    }
  ];

  laq: any = [
    {
      'codigo_producto': 'PT100060',
      'id_caracteristica': '1',
      'especificacion': 'Suspension liquida homogenea pero cuando llego a ella nada halló',
      'estado': '1',
      'tipo_caracteristica': 'CF',
      'usuario_creacion': 'faruni',
      'fecha_creacion': '2018-04-05 15:07:43',
      'usuario_modificacion': 'faruni',
      'fecha_modificacion': '2018-04-05 15:07:43'
    },
    {
      'codigo_producto': 'PT100060',
      'id_caracteristica': '1',
      'especificacion': 'Suspension liquida homogenea',
      'estado': '1',
      'tipo_caracteristica': 'CF',
      'usuario_creacion': 'faruni',
      'fecha_creacion': '2018-04-05 15:07:43',
      'usuario_modificacion': 'faruni',
      'fecha_modificacion': '2018-04-05 15:07:43'
    },
    {
      'codigo_producto': 'PT100060',
      'id_caracteristica': '1',
      'especificacion': 'Suspension liquida homogenea',
      'estado': '1',
      'tipo_caracteristica': 'CF',
      'usuario_creacion': 'faruni',
      'fecha_creacion': '2018-04-05 15:07:43',
      'usuario_modificacion': 'faruni',
      'fecha_modificacion': '2018-04-05 15:07:43'
    },
    {
      'codigo_producto': 'PT100060',
      'id_caracteristica': '1',
      'especificacion': 'Suspension liquida homogenea',
      'estado': '1',
      'tipo_caracteristica': 'CF',
      'usuario_creacion': 'faruni',
      'fecha_creacion': '2018-04-05 15:07:43',
      'usuario_modificacion': 'faruni',
      'fecha_modificacion': '2018-04-05 15:07:43'
    },
    {
      'codigo_producto': 'PT100060',
      'id_caracteristica': '1',
      'especificacion': 'Suspension liquida homogenea',
      'estado': '1',
      'tipo_caracteristica': 'CF',
      'usuario_creacion': 'faruni',
      'fecha_creacion': '2018-04-05 15:07:43',
      'usuario_modificacion': 'faruni',
      'fecha_modificacion': '2018-04-05 15:07:43'
    }
  ];

  lcm: any = [
    {
      'codigo_producto': 'PT100060',
      'id_caracteristica': '1',
      'especificacion': 'Suspension liquida homogenea prueba de que sonn dos lineas o tambien pueden ser 3 lineas de todos modos',
      'estado': '1',
      'tipo_caracteristica': 'CF',
      'usuario_creacion': 'faruni',
      'fecha_creacion': '2018-04-05 15:07:43',
      'usuario_modificacion': 'faruni',
      'fecha_modificacion': '2018-04-05 15:07:43'
    },
    {
      'codigo_producto': 'PT100060',
      'id_caracteristica': '1',
      'especificacion': 'Suspension liquida homogenea',
      'estado': '1',
      'tipo_caracteristica': 'CF',
      'usuario_creacion': 'faruni',
      'fecha_creacion': '2018-04-05 15:07:43',
      'usuario_modificacion': 'faruni',
      'fecha_modificacion': '2018-04-05 15:07:43'
    },
    {
      'codigo_producto': 'PT100060',
      'id_caracteristica': '1',
      'especificacion': 'Suspension liquida homogenea',
      'estado': '1',
      'tipo_caracteristica': 'CF',
      'usuario_creacion': 'faruni',
      'fecha_creacion': '2018-04-05 15:07:43',
      'usuario_modificacion': 'faruni',
      'fecha_modificacion': '2018-04-05 15:07:43'
    },
    {
      'codigo_producto': 'PT100060',
      'id_caracteristica': '1',
      'especificacion': 'Suspension liquida homogenea',
      'estado': '1',
      'tipo_caracteristica': 'CF',
      'usuario_creacion': 'faruni',
      'fecha_creacion': '2018-04-05 15:07:43',
      'usuario_modificacion': 'faruni',
      'fecha_modificacion': '2018-04-05 15:07:43'
    },
    {
      'codigo_producto': 'PT100060',
      'id_caracteristica': '1',
      'especificacion': 'Suspension liquida homogenea',
      'estado': '1',
      'tipo_caracteristica': 'CF',
      'usuario_creacion': 'faruni',
      'fecha_creacion': '2018-04-05 15:07:43',
      'usuario_modificacion': 'faruni',
      'fecha_modificacion': '2018-04-05 15:07:43'
    },
    {
      'codigo_producto': 'PT100060',
      'id_caracteristica': '1',
      'especificacion': 'Suspension liquida homogenea',
      'estado': '1',
      'tipo_caracteristica': 'CF',
      'usuario_creacion': 'faruni',
      'fecha_creacion': '2018-04-05 15:07:43',
      'usuario_modificacion': 'faruni',
      'fecha_modificacion': '2018-04-05 15:07:43'
    }
  ];

  constructor(public global: Globals, private servCertificados: CertificadosService) {
    this.certificado = new Certificados();
  }

  ngOnInit() {
    this.onLoadCertificados();
  }

  onLoadCertificados() {
    this.certificados = new Array<Certificados>();
    this.servCertificados.getCertificadosMP().subscribe(data => {
      console.log('Se cargo corredctamente los Certificados de Producto Terminado');
      // console.log(data);
      this.certificados = data['body'];
      console.log(this.certificados);
    }, (err: HttpErrorResponse) => {
      if (err.error instanceof Error) {
        console.log('Ocurrio un error:', err.error.message);
      } else {
        // The backend returned an unsuccessful response code.
        // The response body may contain clues as to what went wrong,
        console.log(`El servidor respondio: ${err.status}, body was: ${err.error}`);
      }
    });
  }

  onLoadCertificado(cod: string) {
    this.certificado = new Certificados();
    this.servCertificados.getCertificado(cod).subscribe(data => {
      console.log('Se cargo correctamente este certificado');
      // console.log(data);
      this.certificado = data['body'][0];
      console.log(this.certificado);
      this.onLoadCFCertificado(cod);
    }, (err: HttpErrorResponse) => {
      if (err.error instanceof Error) {
        console.log('Ocurrio un error:', err.error.message);
      } else {
        // The backend returned an unsuccessful response code.
        // The response body may contain clues as to what went wrong,
        console.log(`El servidor respondio: ${err.status}, body was: ${err.error}`);
      }
    });
  }
  
  onLoadCFCertificado(codigo_certificado: String) {
    this.servCertificados.getCFCertificado(codigo_certificado).subscribe(data => {
      console.log('Se cargo correctamente Lista Caracteristicas Fisicas');
      // console.log(data);
      this.lcf = data['body'];
      console.log(this.lcf);
      this.onLoadAQCertificado(codigo_certificado);
    }, (err: HttpErrorResponse) => {
      if (err.error instanceof Error) {
        console.log('Ocurrio un error:', err.error.message);
      } else {
        // The backend returned an unsuccessful response code.
        // The response body may contain clues as to what went wrong,
        console.log(`El servidor respondio: ${err.status}, body was: ${err.error}`);
      }
    });
  }

  onLoadAQCertificado(codigo_certificado: String) {
    this.servCertificados.getAQCertificado(codigo_certificado).subscribe(data => {
      console.log('Se cargo correctamente Lista Analisis Quimico');
      // console.log(data);
      this.laq = data['body'];
      console.log(this.laq);
      this.onLoadCMCertificado(codigo_certificado);
    }, (err: HttpErrorResponse) => {
      if (err.error instanceof Error) {
        console.log('Ocurrio un error:', err.error.message);
      } else {
        // The backend returned an unsuccessful response code.
        // The response body may contain clues as to what went wrong,
        console.log(`El servidor respondio: ${err.status}, body was: ${err.error}`);
      }
    });
  }

  onLoadCMCertificado(codigo_certificado: String) {
    this.servCertificados.getCMCertificado(codigo_certificado).subscribe(data => {
      console.log('Se cargo correctamente Lista Control Microbiologico');
      // console.log(data);
      this.lcm = data['body'];
      console.log(this.lcm);
      this.generarReporte(this.certificado);
    }, (err: HttpErrorResponse) => {
      if (err.error instanceof Error) {
        console.log('Ocurrio un error:', err.error.message);
      } else {
        // The backend returned an unsuccessful response code.
        // The response body may contain clues as to what went wrong,
        console.log(`El servidor respondio: ${err.status}, body was: ${err.error}`);
      }
    });
  }

  sort(key) {
    this.key = key;
    this.reverse = !this.reverse;
  }

  p: number = 1;

  onLoadCertificadoPT() {
    this.servCertificados.getReporteCertificados('').subscribe(data => {
      console.log('Se genero el reporte correctamente');
      let fileURL = URL.createObjectURL(data);
      window.open(fileURL);
    }, (err: HttpErrorResponse) => {
      if (err.error instanceof Error) {
        console.log('Ocurrio un error:', err.error.message);
      } else {
        // The backend returned an unsuccessful response code.
        // The response body may contain clues as to what went wrong,
        console.log(`El servidor respondio: ${err.status}, body was: ${err.error}`);
      }
    });
  }

  obtenerDatosReporte(codigo_certificado: string) {
    this.onLoadCertificado(codigo_certificado.replace('/', '|'));
  }
  generarReporte(c: Certificados) {

    console.log('Generando Certificado');
    console.log(c);

    let doc = new jsPDF('P', 'mm', 'legal');
 //#region imagen
    let imgData= 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOwAAAC5CAYAAAArkNNQAAAACXBIWXMAAA9hAAAPYQGoP6dpAAA7qmlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4KPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMwNjcgNzkuMTU3NzQ3LCAyMDE1LzAzLzMwLTIzOjQwOjQyICAgICAgICAiPgogICA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPgogICAgICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIgogICAgICAgICAgICB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iCiAgICAgICAgICAgIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIgogICAgICAgICAgICB4bWxuczpzdEV2dD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlRXZlbnQjIgogICAgICAgICAgICB4bWxuczpkYz0iaHR0cDovL3B1cmwub3JnL2RjL2VsZW1lbnRzLzEuMS8iCiAgICAgICAgICAgIHhtbG5zOnBob3Rvc2hvcD0iaHR0cDovL25zLmFkb2JlLmNvbS9waG90b3Nob3AvMS4wLyIKICAgICAgICAgICAgeG1sbnM6dGlmZj0iaHR0cDovL25zLmFkb2JlLmNvbS90aWZmLzEuMC8iCiAgICAgICAgICAgIHhtbG5zOmV4aWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20vZXhpZi8xLjAvIj4KICAgICAgICAgPHhtcDpDcmVhdG9yVG9vbD5BZG9iZSBQaG90b3Nob3AgQ0MgMjAxNSAoV2luZG93cyk8L3htcDpDcmVhdG9yVG9vbD4KICAgICAgICAgPHhtcDpDcmVhdGVEYXRlPjIwMTYtMTEtMTRUMDg6MzM6MjAtMDQ6MDA8L3htcDpDcmVhdGVEYXRlPgogICAgICAgICA8eG1wOk1ldGFkYXRhRGF0ZT4yMDE3LTA0LTA3VDE0OjEwOjQ4LTA0OjAwPC94bXA6TWV0YWRhdGFEYXRlPgogICAgICAgICA8eG1wOk1vZGlmeURhdGU+MjAxNy0wNC0wN1QxNDoxMDo0OC0wNDowMDwveG1wOk1vZGlmeURhdGU+CiAgICAgICAgIDx4bXBNTTpJbnN0YW5jZUlEPnhtcC5paWQ6YTZmNTE1MzktYzljMy1hNDQ4LTljYjctY2RhZDg4NWI2OTIxPC94bXBNTTpJbnN0YW5jZUlEPgogICAgICAgICA8eG1wTU06RG9jdW1lbnRJRD5hZG9iZTpkb2NpZDpwaG90b3Nob3A6ODFmMzc0YmQtMWJiZC0xMWU3LTk2YjItOTY4MThiYmY0NmQ4PC94bXBNTTpEb2N1bWVudElEPgogICAgICAgICA8eG1wTU06T3JpZ2luYWxEb2N1bWVudElEPnhtcC5kaWQ6NWIwOGM3YzktODg2ZS1kODQ0LThhZmMtYjc4YzNmYTQxYTE1PC94bXBNTTpPcmlnaW5hbERvY3VtZW50SUQ+CiAgICAgICAgIDx4bXBNTTpIaXN0b3J5PgogICAgICAgICAgICA8cmRmOlNlcT4KICAgICAgICAgICAgICAgPHJkZjpsaSByZGY6cGFyc2VUeXBlPSJSZXNvdXJjZSI+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDphY3Rpb24+Y3JlYXRlZDwvc3RFdnQ6YWN0aW9uPgogICAgICAgICAgICAgICAgICA8c3RFdnQ6aW5zdGFuY2VJRD54bXAuaWlkOjViMDhjN2M5LTg4NmUtZDg0NC04YWZjLWI3OGMzZmE0MWExNTwvc3RFdnQ6aW5zdGFuY2VJRD4KICAgICAgICAgICAgICAgICAgPHN0RXZ0OndoZW4+MjAxNi0xMS0xNFQwODozMzoyMC0wNDowMDwvc3RFdnQ6d2hlbj4KICAgICAgICAgICAgICAgICAgPHN0RXZ0OnNvZnR3YXJlQWdlbnQ+QWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKFdpbmRvd3MpPC9zdEV2dDpzb2Z0d2FyZUFnZW50PgogICAgICAgICAgICAgICA8L3JkZjpsaT4KICAgICAgICAgICAgICAgPHJkZjpsaSByZGY6cGFyc2VUeXBlPSJSZXNvdXJjZSI+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDphY3Rpb24+c2F2ZWQ8L3N0RXZ0OmFjdGlvbj4KICAgICAgICAgICAgICAgICAgPHN0RXZ0Omluc3RhbmNlSUQ+eG1wLmlpZDo3MjY5MDE1OS1lYzU3LTI1NDUtYjZmYS03MDUxYzg5NmE3ZDk8L3N0RXZ0Omluc3RhbmNlSUQ+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDp3aGVuPjIwMTYtMTEtMTRUMDg6MzM6MjAtMDQ6MDA8L3N0RXZ0OndoZW4+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDpzb2Z0d2FyZUFnZW50PkFkb2JlIFBob3Rvc2hvcCBDQyAyMDE1IChXaW5kb3dzKTwvc3RFdnQ6c29mdHdhcmVBZ2VudD4KICAgICAgICAgICAgICAgICAgPHN0RXZ0OmNoYW5nZWQ+Lzwvc3RFdnQ6Y2hhbmdlZD4KICAgICAgICAgICAgICAgPC9yZGY6bGk+CiAgICAgICAgICAgICAgIDxyZGY6bGkgcmRmOnBhcnNlVHlwZT0iUmVzb3VyY2UiPgogICAgICAgICAgICAgICAgICA8c3RFdnQ6YWN0aW9uPnNhdmVkPC9zdEV2dDphY3Rpb24+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDppbnN0YW5jZUlEPnhtcC5paWQ6YTZmNTE1MzktYzljMy1hNDQ4LTljYjctY2RhZDg4NWI2OTIxPC9zdEV2dDppbnN0YW5jZUlEPgogICAgICAgICAgICAgICAgICA8c3RFdnQ6d2hlbj4yMDE3LTA0LTA3VDE0OjEwOjQ4LTA0OjAwPC9zdEV2dDp3aGVuPgogICAgICAgICAgICAgICAgICA8c3RFdnQ6c29mdHdhcmVBZ2VudD5BZG9iZSBQaG90b3Nob3AgQ0MgMjAxNSAoV2luZG93cyk8L3N0RXZ0OnNvZnR3YXJlQWdlbnQ+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDpjaGFuZ2VkPi88L3N0RXZ0OmNoYW5nZWQ+CiAgICAgICAgICAgICAgIDwvcmRmOmxpPgogICAgICAgICAgICA8L3JkZjpTZXE+CiAgICAgICAgIDwveG1wTU06SGlzdG9yeT4KICAgICAgICAgPGRjOmZvcm1hdD5pbWFnZS9wbmc8L2RjOmZvcm1hdD4KICAgICAgICAgPHBob3Rvc2hvcDpDb2xvck1vZGU+MzwvcGhvdG9zaG9wOkNvbG9yTW9kZT4KICAgICAgICAgPHRpZmY6T3JpZW50YXRpb24+MTwvdGlmZjpPcmllbnRhdGlvbj4KICAgICAgICAgPHRpZmY6WFJlc29sdXRpb24+MTAwMDAwMC8xMDAwMDwvdGlmZjpYUmVzb2x1dGlvbj4KICAgICAgICAgPHRpZmY6WVJlc29sdXRpb24+MTAwMDAwMC8xMDAwMDwvdGlmZjpZUmVzb2x1dGlvbj4KICAgICAgICAgPHRpZmY6UmVzb2x1dGlvblVuaXQ+MjwvdGlmZjpSZXNvbHV0aW9uVW5pdD4KICAgICAgICAgPGV4aWY6Q29sb3JTcGFjZT42NTUzNTwvZXhpZjpDb2xvclNwYWNlPgogICAgICAgICA8ZXhpZjpQaXhlbFhEaW1lbnNpb24+MjM2PC9leGlmOlBpeGVsWERpbWVuc2lvbj4KICAgICAgICAgPGV4aWY6UGl4ZWxZRGltZW5zaW9uPjE4NTwvZXhpZjpQaXhlbFlEaW1lbnNpb24+CiAgICAgIDwvcmRmOkRlc2NyaXB0aW9uPgogICA8L3JkZjpSREY+CjwveDp4bXBtZXRhPgogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAg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';
//#endregion

    doc.addImage(imgData, 'PNG', 10, 10, 34, 25);

    doc.setFontType('bold');
    doc.text(120, 15, 'LABORATORIOS FARMACÉUTICOS LAFAR S.A.', null, null, 'center');
    doc.setFontSize(12);
    doc.setFontType('normal');
    doc.text(120, 20, 'DEPARTAMENTO DE CONTROL DE CALIDAD', null, null, 'center');
    doc.text(120, 25, 'CERTIFICADO DE ANALISIS', null, null, 'center');
    doc.text(120, 30, c.tipo_certificado.toUpperCase() + ' - ' + c.tipo_clasificacion_producto, null, null, 'center');
    doc.text(190, 35, 'FOR811201', null, null, 'center');
    // doc.line(10, 35, 205, 35);

    // CABECERA PRODUCTO
    doc.setFontSize(8);
    doc.setFontStyle('normal');
    doc.text(180, 41, c.protocolo );

    doc.setFontSize(10);
    doc.setFontStyle('bold');
    doc.text(150, 41, 'Protocolo:');

    doc.rect(175, 37, 30, 5);


    doc.setFontSize(10);
    doc.setFontStyle('bold');
    doc.text(18, 47, 'Lote');
    doc.setFontSize(10);
    doc.setFontStyle('bold');
    doc.text(83, 47, 'Nombre del Producto');
    doc.setFontSize(10);
    doc.setFontStyle('bold');
    doc.text(148, 47, 'Nombre del Proveedor');
    doc.rect(10, 43, 32.5, 6);
    doc.rect(75, 43, 65, 6);
    doc.rect(140, 43, 65, 6);

    doc.setFontSize(10);
    doc.setFontStyle('normal');
    doc.text(15, 53, c.lote);
    doc.setFontSize(8);
    doc.setFontStyle('normal');

    // Nombre del Producto
    let tamcon: number = c.nombre_producto.length;
    if (tamcon / 35 <= 1) {
      doc.text(80, 53, c.nombre_producto);
    } else if (tamcon / 35 > 1 && tamcon / 35 <= 2) {
      doc.text(80, 53, c.nombre_producto.substr(0, 32));
      doc.text(80, 58, c.nombre_producto.substr(32, tamcon));
    } else if (tamcon / 35 > 2) {
      doc.text(80, 53, c.nombre_producto.substr(0, 32));
      doc.text(80, 58, c.nombre_producto.substr(32, 32));
      doc.text(80, 63, c.nombre_producto.substr(64, tamcon));
    }
    // doc.text(80, 57, 'Sulbactam base 62.5 mg;');
    //Nombre del Proveedor
    
    let nombre_prov = c.nombre_proveedor;
    let tamnomprov = c.nombre_proveedor.length;
    let lineasprov:number = tamnomprov/30;
    let proveedor_palabras = c.nombre_proveedor.split(' ');

    doc.setFontSize(10);
    doc.setFontStyle('normal');

    switch (lineasprov){
      case 1: 
        doc.text(145, 53,'1' + c.nombre_proveedor);
      break;
      case 2: 
        doc.text(145, 53,'2' +  c.nombre_proveedor);
      break;
      case 3: 
        doc.text(145, 53,'3' + c.nombre_proveedor);
      break;
    }
    doc.rect(10, 49, 32.5, 6);
    doc.rect(75, 49, 65, 18);
    doc.rect(140, 49, 65, 18);

    // End nombre del proveedor

    doc.setFontSize(9);
    doc.setFontStyle('bold');
    doc.text(57.5, 47, 'Fecha de Análisis', null, null, 'center');
    doc.setFontSize(9);
    doc.setFontStyle('normal');
    doc.text(57.5, 53, c.fecha_analisis.substr(0, 10), null, null, 'center');
    doc.rect(42.5, 43, 32.5, 6);
    doc.rect(42.5, 49, 32.5, 6);

    doc.setFontSize(9);
    doc.setFontStyle('bold');
    doc.text(25, 59, 'Fecha de Fab.', null, null, 'center');
    doc.setFontSize(9);
    doc.setFontStyle('normal');
    doc.text(25, 65, c.fecha_fabricacion.substr(0, 10), null, null, 'center');
    doc.rect(10, 55, 32.5, 6);
    doc.rect(10, 61, 32.5, 6);

    doc.setFontSize(9);
    doc.setFontStyle('bold');
    doc.text(57.5, 59, 'Fecha de Vmto.', null, null, 'center');
    doc.setFontSize(9);
    doc.setFontStyle('normal');
    doc.text(57.5, 65, c.fecha_vencimiento.substr(0, 10), null, null, 'center');
    doc.rect(42.5, 55, 32.5, 6);
    doc.rect(42.5, 61, 32.5, 6);
  
    // CUERPO CARACTERISTICAS DEL PRODUCTO
    // TITULO CUERPO
    doc.setFillColor(0, 157, 224);
    doc.setDrawColor(255, 255, 255);
    doc.rect(10, 68, 55, 7, 'FD');
    doc.rect(65, 68, 70, 7, 'FD');
    doc.rect(135, 68, 70, 7, 'FD');
    doc.rect(10, 75, 195, 7, 'FD');


    doc.setFontSize(10);
    doc.setFontStyle('bold');
    doc.setTextColor(255, 255, 255);
    doc.text(38, 73, 'ENSAYO', null, null, 'center');
    doc.text(100, 73, 'ESPECIFICACIONES', null, null, 'center');
    doc.text(170, 73, 'RESULTADO', null, null, 'center');
    doc.text(12, 80, 'CARACTERÍSTICAS FÍSICAS');

    // DESCRIPCIÓN CARACTERÍSTICAS
    let alto1: number = 0;
    let count_celda: number = 0;

    let cad1: String = '';
    let cad2: String = '';
    let cad3: String = '';


    let alto1r: number = 0;
    let count_celdar: number = 0;

    let cad1r: String = '';
    let cad2r: String = '';
    let cad3r: String = '';

    this.lcf.forEach((element, index) => {
      //#region Especificacion
      let asd: String = element['especificacion'];
      let longitud: number = asd.length;
      let alto: number = 0;

      if ((longitud / 43) > 2) {
        cad1 = asd.substring(0, 40);
        cad2 = asd.substring(40, 80);
        cad3 = asd.substring(80, longitud);
        count_celda = 3;
        alto = 15;
      } else if (longitud / 43 > 1) {
        cad1 = asd.substring(0, 40);
        cad2 = asd.substring(40, longitud);
        count_celda = 2;
        alto = 10;
      } else {
        cad1 = asd.substring(0, longitud);
        count_celda = 1;
        alto = 5;
      }
      //#endregion

      //#region Resultado
      let asdr: String = element['resultado'];
      let longitudr: number = asdr.length;
      let altor: number = 0;

      if ((longitudr / 43) > 2) {
        cad1r = asdr.substring(0, 40);
        cad2r = asdr.substring(40, 80);
        cad3r = asdr.substring(80, longitudr);
        count_celdar = 3;
        altor = 15;
      } else if (longitudr / 43 > 1) {
        cad1r = asdr.substring(0, 40);
        cad2r = asdr.substring(40, longitudr);
        count_celdar = 2;
        altor = 10;
      } else {
        cad1r = asdr.substring(0, longitudr);
        count_celdar = 1;
        altor = 5;
      }
      //#endregion

      // Lineas
      doc.setFillColor(255, 255, 255);
      doc.setDrawColor(0, 0, 0);

      doc.rect(10, 82.5 + alto1, 55, alto, 'FD');
      doc.rect(65, 82.5 + alto1, 70, alto, 'FD');
      doc.rect(135, 82.5 + alto1, 70, alto, 'FD');

      // Texto Titulo Caracteristica
      doc.setFontSize(10);
      doc.setFontStyle('bold');
      doc.setTextColor(0, 0, 0);
      doc.text(12, 86.5 + alto1, element['id_caracteristica']);

      // Texto Dinamico
      for (let m = 0; m < count_celda; m++) {
        let cadaux: String = '';
        let cadauxr: String = '';
        switch (m) {
          case 0: cadaux = cad1; cadauxr = cad1r; break;
          case 1: cadaux = cad2; cadauxr = cad2r; break;
          case 2: cadaux = cad3; cadauxr = cad3r; break;
        }

        doc.setFontSize(10);
        doc.setFontStyle('normal');
        doc.text(100, 86.5 + alto1, cadaux, null, null, 'center');
        doc.text(170, 86.5 + alto1, cadauxr, null, null, 'center');

        alto1 = alto1 + 5;
      }
    });

//#region ANALISIS QUIMICO
    // ANALISIS QUIMICO
    alto1 = alto1 - 5;
    let alto2: number = 0;
    let count_celdaaq: number = 0;

    let cad1aq: String = '';
    let cad2aq: String = '';
    let cad3aq: String = '';


    doc.setFillColor(255, 255, 255);
    doc.setDrawColor(255, 255, 255);
    doc.setFontSize(10);
    doc.setFontStyle('bold');
    doc.setTextColor(255, 255, 255);
    doc.rect(10, 88 + alto1 + alto2, 195, 7, 'FD');
    doc.text(12, 93 + alto1 + alto2, 'ANÁLISIS QUÍMICO');

    this.laq.forEach((element, index) => {

      let asd: String = element['especificacion'];
      let longitud: number = asd.length;
      let alto: number = 0;

      if ((longitud / 43) > 2) {
        cad1 = asd.substring(0, 40);
        cad2 = asd.substring(40, 80);
        cad3 = asd.substring(80, longitud);
        count_celda = 3;
        alto = 15;
      } else if (longitud / 43 > 1) {
        cad1 = asd.substring(0, 40);
        cad2 = asd.substring(40, longitud);
        count_celda = 2;
        alto = 10;
      } else {
        cad1 = asd.substring(0, longitud);
        count_celda = 1;
        alto = 5;
      }
      
      // Lineas
      doc.setFillColor(255, 255, 255);
      doc.setDrawColor(0, 0, 0);

      doc.rect(10, 96 + alto1 + alto2 , 55, alto, 'FD');
      doc.rect(65, 96 + alto1 + alto2 , 70, alto, 'FD');
      doc.rect(135, 96 + alto1 + alto2 , 70, alto, 'FD');

      // nombre de caracteristica
      doc.setFontSize(10);
      doc.setFontStyle('bold');
      doc.setTextColor(0, 0, 0);
      doc.text(12, 100 + alto1 + alto2, element['id_caracteristica']);


      // Texto Dinamico
      for (let m = 0; m < count_celda; m++) {
        let cadaux: String = '';
        switch (m) {
          case 0: cadaux = cad1; break;
          case 1: cadaux = cad2; break;
          case 2: cadaux = cad3; break;
        }

        doc.setFontSize(10);
        doc.setFontStyle('normal');
        doc.text(100, 100 + alto1 + alto2, cadaux, null, null, 'center');
        doc.text(170, 100 + alto1 + alto2, element['resultado'], null, null, 'center');

        alto2 = alto2 + 5;
      }
    });
//#endregion
    
// CONTROL MICROBIOLOGICO
    alto2 = alto2 - 5;
    let alto3: number = 0;
    let count_celdacm: number = 0;

    let cad1cm: String = '';
    let cad2cm: String = '';
    let cad3cm: String = '';

    doc.setFillColor(0, 157, 224);
    doc.setDrawColor(255, 255, 255);
    doc.setFontSize(10);
    doc.setFontStyle('bold');
    doc.setTextColor(255, 255, 255);
    doc.rect(10, 102 + alto1 + alto2 + alto3, 195, 7, 'FD');
    doc.text(12, 107 + alto1 + alto2 + alto3, 'CONTROL MICROBIOLÓGICO');

    this.lcm.forEach((element, index) => {

      let asd: String = element['especificacion'];
      let longitud: number = asd.length;
      let alto: number = 0;

      if ((longitud / 43) > 2) {
        cad1 = asd.substring(0, 40);
        cad2 = asd.substring(40, 80);
        cad3 = asd.substring(80, longitud);
        count_celda = 3;
        alto = 15;
      } else if (longitud / 43 > 1) {
        cad1 = asd.substring(0, 40);
        cad2 = asd.substring(40, longitud);
        count_celda = 2;
        alto = 10;
      } else {
        cad1 = asd.substring(0, longitud);
        count_celda = 1;
        alto = 5;
      }

      // Lineas
      doc.setFillColor(255, 255, 255);
      doc.setDrawColor(0, 0, 0);

      doc.rect(10, 110 + alto1 + alto2 + alto3, 55, alto, 'FD');
      doc.rect(65, 110 + alto1 + alto2 + alto3, 70, alto, 'FD');
      doc.rect(135, 110 + alto1 + alto2 + alto3, 70, alto, 'FD');

      // nombre de caracteristica
      doc.setFontSize(10);
      doc.setFontStyle('bold');
      doc.setTextColor(0, 0, 0);
      doc.text(12, 114 + alto1 + alto2 + alto3, element['id_caracteristica']);

      // Texto Dinamico
      for (let m = 0; m < count_celda; m++) {
        let cadaux: String = '';
        switch (m) {
          case 0: cadaux = cad1; break;
          case 1: cadaux = cad2; break;
          case 2: cadaux = cad3; break;
        }

        doc.setFontSize(10);
        doc.setFontStyle('normal');
        doc.text(100, 114 + alto1 + alto2 + alto3, cadaux, null, null, 'center');
        doc.text(170, 114 + alto1 + alto2 + alto3, element['resultado'], null, null, 'center');

        alto3 = alto3 + 5;
      }
    });

    doc.rect(10, 115 + alto1 + alto2 + alto3 , 195, 5);
    doc.rect(10, 120 + alto1 + alto2 + alto3 , 195, 10);
    doc.setFontStyle('bold');
    doc.text(12, 119 + alto1 + alto2 + alto3 , 'CONSERVACIÓN Y ALMACENAMIENTO');
    doc.text(12, 119 + alto1 + alto2 + alto3 + 5, c.conservacionyalm);
    
    doc.rect(10, 131 + alto1 + alto2 + alto3 , 195, 5);
    doc.rect(10, 136 + alto1 + alto2 + alto3 , 195, 10);
    doc.setFontStyle('bold');
    doc.text(12, 135 + alto1 + alto2 + alto3 , 'REFERENCIAS');
    doc.text(12, 135 + alto1 + alto2 + alto3 + 5, c.referencias);

    doc.rect(10, 147 + alto1 + alto2 + alto3 , 195, 5);
    doc.rect(10, 152 + alto1 + alto2 + alto3 , 195, 10);
    doc.setFontStyle('bold');
    doc.text(12, 151 + alto1 + alto2 + alto3 , 'OBSERVACIÓN');
    doc.text(12, 151 + alto1 + alto2 + alto3 + 5, c.observaciones);

    //PIE DE DOCUMENTO FIRMAS
    let i: number = 150 ;

    doc.rect(10, i + 120, 65, 5);
    doc.rect(75, i + 120, 65, 5);
    doc.rect(140, i + 120, 65, 5);

    doc.rect(10, i + 125, 65, 40);
    doc.rect(75, i + 125, 65, 33);
    doc.rect(140, i + 125, 65, 15);

    doc.rect(75, i + 158, 65, 7);
    doc.rect(140, i + 140, 65, 5);
    doc.rect(140, i + 145, 65, 20);

    doc.setFontStyle('bold');
    doc.text(30, i + 124, 'DICTAMEN');
    doc.text(95, i + 124, 'ANALISTA');
    doc.text(150, i + 124, 'JEFE DE C. DE CALIDAD');
    doc.text(150, i + 144, 'Vo Bo DIRECTOR TÉCNICO');
    doc.text(85, i + 163, 'FECHA: ');


    doc.setFontStyle('normal');
    doc.text(100, i + 163, c.fecha_analisis.substr(0, 10));
    doc.setFontSize(12);
    doc.text(10, i + 170, 'Este Documento ha sido diseñado electrónicamente. Por lo tanto es válido');



    // VISTA PRELIMINAR ANTES DE LA IMPRESION
    let string = doc.output('datauri');
    let iframe = '<iframe width="100%" height="100%" src="' + string + '"></iframe>';
    let x = window.open();
    x.document.open();
    x.document.write(iframe);
    x.document.close();
    // END VISTA PRELIMINAR

  }

  obtenerPDF(){
    this.servCertificados.getCertificadoPTPDF(5).subscribe(data => {
      console.log(data);

      let blob = new Blob([data], {type: 'application/pdf'});
      let fileURL = URL.createObjectURL(blob);
      window.open(fileURL);

      //var pdfAsDataUri = "data:application/pdf;base64,"+data;
      //window.open(pdfAsDataUri);
      
      /*var file = new Blob([data], {type: 'application/pdf'});
      */
    }, (err: HttpErrorResponse) => {
      if (err.error instanceof Error) {
        console.log('Ocurrio un error:', err.error.message);
      } else {
        // The backend returned an unsuccessful response code.
        // The response body may contain clues as to what went wrong,
        console.log(`El servidor respondio: ${err.status}, body was: ${err.error}`);
      }
    });
  }
}
