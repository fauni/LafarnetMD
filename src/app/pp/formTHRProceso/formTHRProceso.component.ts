import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Monitoreothrproceso } from '../monitoreothrproceso';
import { Areas } from '../../admin-intranet/areas/areas';
import { AreasService } from '../../admin-intranet/areas/areas.service';
import { HttpErrorResponse } from '@angular/common/http/src/response';
import { SeccionesService } from '../../admin-intranet/secciones/secciones.service';
import { Secciones } from '../../admin-intranet/secciones/secciones';
import { EtapasProcesoService } from '../etapasproceso.service';
import { Etapasproceso } from '../etapasproceso';
import { PpService } from '../pp.service';
import { ProductoProceso } from '../productoproceso';
import { Higrotermometro } from '../../metrologia/higrotermometro';
import { HigrotermometroService } from '../../metrologia/higrotermometro.service';

@Component({
  selector: 'app-formthrproceso',
  templateUrl: './formTHRProceso.component.html',
  styleUrls: ['./formTHRProceso.component.scss']
})
export class FormTHRProcesoComponent implements OnInit {
  // Area
  selectArea: any;
  areas: Array<Areas> = new Array<Areas>();
  secciones: Array<Secciones> = new Array<Secciones>();
  etapasprocesos: Array<Etapasproceso> = new Array<Etapasproceso>();
  productosprocesos: Array<ProductoProceso> = new Array<ProductoProceso>();
  monitoreo: Monitoreothrproceso = new Monitoreothrproceso();

  higrotermometros: Array<Higrotermometro> = new Array<Higrotermometro>();
  higrotermometro: Higrotermometro = new Higrotermometro();

  // Proceso
  procesoValue: any = 'PP';
  productoAll: string;

  constructor(private servArea: AreasService,
    private servSeccion: SeccionesService,
    private servEtapaProceso: EtapasProcesoService,
    private servProducto: PpService,
    private servHigrotermometro: HigrotermometroService) { }

  ngOnInit() {
    this.onLoadAreas();
    this.monitoreo.id_monitoreo_thr_proceso = 1;
    this.monitoreo.id_seccion = 1;
    this.monitoreo.id_etapa = 1;
    this.monitoreo.lote =  '';
    this.monitoreo.hora =  '';
    this.monitoreo.fecha =  '';
    this.monitoreo.higroscopico = false;
    this.monitoreo.username = localStorage.getItem('username');
    this.monitoreo.estado = '';
    this.monitoreo.usuario_creacion = localStorage.getItem('username');
    this.monitoreo.fecha_creacion = '';
    this.monitoreo.usuario_modificacion = localStorage.getItem('username');
    this.monitoreo.fecha_modificacion = '';
  }

  // Carga de informacion de areas productivas
  onLoadAreas() {
      this.servArea.getAreasForProduccion().subscribe(
        data => {
          this.areas = data.body;
          console.log(this.areas);
        },
        (err: HttpErrorResponse) => {
          if (err.error instanceof Error) {
            // A client-side or network error occurred. Handle it accordingly.
            console.log('Ocurrio un error:', err.error.message);
          } else {
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong,
            console.log(`El servidor respondio: ${err.status}, body was: ${err.error}`);
          }
        }
      );
  }

  onLoadSecciones() {
    this.servSeccion.getSeccionForArea(this.selectArea).subscribe(
      data => {
        this.secciones = data['body'];
        console.log(this.secciones);
      },
      (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          // A client-side or network error occurred. Handle it accordingly.
          console.log('Ocurrio un error:', err.error.message);
        } else {
          // The backend returned an unsuccessful response code.
          // The response body may contain clues as to what went wrong,
          console.log(`El servidor respondio: ${err.status}, body was: ${err.error}`);
        }
      }
    );
  }

  onLoadEtapasProceso(datos) {
    this.servEtapaProceso.getEtapaProceso(datos).subscribe(
      data => {
        this.etapasprocesos = data['body'];
        console.log(this.etapasprocesos);
      },
      (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          // A client-side or network error occurred. Handle it accordingly.
          console.log('Ocurrio un error:', err.error.message);
        } else {
          // The backend returned an unsuccessful response code.
          // The response body may contain clues as to what went wrong,
          console.log(`El servidor respondio: ${err.status}, body was: ${err.error}`);
        }
      }
    );
  }


  onSelectArea() {
    console.log(this.selectArea);
    this.onLoadSecciones();
    this.onSelectProceso(this.procesoValue);
  }

  onSelectSeccion() {
    console.log(this.monitoreo);
  }

  onSelectProceso(valor: string) {
    debugger;
    console.log(valor + ' - ' + this.selectArea);
    let valorPP: number = 1;
    if (valor == 'PD') {
      valorPP = 2;
    }else {
      valorPP = 1;
    }

    let datosProceso: any = {
      id_proceso: valorPP,
      id_area: this.selectArea
    };

    this.onLoadEtapasProceso(datosProceso);
    console.log(valorPP);
  }


  onLoadProductoForLote() {
    console.log(this.monitoreo.lote);
    this.onLoadProductoProceso(this.monitoreo.lote);
  }


  onLoadProductoProceso(lote) {
    let nLote: string = lote;
    this.servProducto.getProductoForLote(nLote.replace('/', '|')).subscribe(
      data => {
        this.productosprocesos = data['body'];
        console.log(this.productosprocesos);
      },
      (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          // A client-side or network error occurred. Handle it accordingly.
          console.log('Ocurrio un error:', err.error.message);
        } else {
          // The backend returned an unsuccessful response code.
          // The response body may contain clues as to what went wrong,
          console.log(`El servidor respondio: ${err.status}, body was: ${err.error}`);
        }
      }
    );
  }

  onSelectEtapa() {

  }

  onSelectProducto() {
    let p: any = this.productoAll.split('|');
    // alert(p[0]);
    this.monitoreo.codigo_producto = p[0];
    this.monitoreo.nombre_producto = p[1];
  }

  onSaveMonitoreoTHRProceso() {
    console.log(this.monitoreo);
  }

  onCorrigueTemperaturaHumedad() {
    this.monitoreo.temperatura_corregido = this.monitoreo.temperatura_original;
    this.monitoreo.humedad_relativa_corregido = this.monitoreo.humedad_relativa_original;
  }


  // Higrotermometro
  onLoadHigrotermometroForSeccion(seccion) {
    this.servHigrotermometro.getHigrotermometro(seccion).subscribe(
      data => {
        this.higrotermometro = data['body'][0];
        console.log(this.higrotermometro);
      },
      (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          // A client-side or network error occurred. Handle it accordingly.
          console.log('Ocurrio un error:', err.error.message);
        } else {
          // The backend returned an unsuccessful response code.
          // The response body may contain clues as to what went wrong,
          console.log(`El servidor respondio: ${err.status}, body was: ${err.error}`);
        }
      }
    );
  }
}
