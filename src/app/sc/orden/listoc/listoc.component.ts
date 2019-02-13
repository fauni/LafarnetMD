import { Component, OnInit } from '@angular/core';
import { Solicitudcompralistado, SolicitudCompra, RequestAnulacionSolicitud,
  RequestAutorizacionSolicitud } from '../../solicitud/solicitud';
import { SolicitudService } from '../../solicitud/solicitud.service';
import { MzToastService } from 'ng2-materialize';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { OrdenService } from '../orden.service';
import { OrdenCompraListAbastecimiento, OCOrdenCompra } from '../orden';

@Component({
  selector: 'app-listoc',
  templateUrl: './listoc.component.html',
  styleUrls: ['./listoc.component.scss'],
})
export class ListocComponent implements OnInit {
  // Existen Ordenes para transferir
  transferencia: Boolean = false;

  // Anulacion de Solicitud
  aorden: RequestAnulacionSolicitud = new RequestAnulacionSolicitud();

  // vARIABLES DE BUSQUEDA
  term: string = '';
  estado_autorizacion_subgerencia: string;
  // END VARIABLES DE BUSQUEDA

  lorden: Array<OrdenCompraListAbastecimiento> = new Array<OrdenCompraListAbastecimiento>();
  orden: OCOrdenCompra = new OCOrdenCompra();

  constructor(private servSC: SolicitudService, private servOC: OrdenService, private toast: MzToastService, private router: Router) { }

  ngOnInit() {
    this.onVerificaEstadoTransferenciaOC();
    this.onGetOrdenesCompra();
  }

  // Esta funcion obtiene las solicitudes del Solicitante
  onGetOrdenesCompra(): void {
    this.openLoading();
    this.servOC.getOrdenCompraAbastecimiento().subscribe(
      data => {
        this.closeLoading();
        if (data['length'] > 0) {
          this.lorden = data['body'];
          // this.toast.show('Se trajo ' + data['length'] + ' solicitudes', 2000, 'green');
        }else {
          this.toast.show('No existen Ordenes de Compra!', 1000, 'red');
        }
        console.log(data);
      },
      (err: HttpErrorResponse) => {
        this.closeLoading();
        this.toast.show('Ocurrio un error al obtener las Ordenes de Compra!', 1000, 'red');
        if (err.error instanceof Error) {
          console.log('Ocurrio un error:', err.error.message);
        } else {
          console.log(`El servidor respondio: ${err.status}, body was: ${err.error}`);
        }
      }
    );
  }

  // Funcion que verifica si existen ordenes que no hay sido sincronizadas con el SAP
  onVerificaEstadoTransferenciaOC(): void {
    // debugger;
    this.openLoading();
    this.servOC.getVerificaEstadoTransferenciaOC().subscribe(
      data => {
        this.closeLoading();
        if (data['result'] == true) {
          this.transferencia = true;
        } else {
          this.transferencia = false;
        }
      },
      (err: HttpErrorResponse) => {
        this.closeLoading();
        this.toast.show('Ocurrio un error al verificar el estado de transferencia de las Ordenes de Compra!', 1000, 'red');
        if (err.error instanceof Error) {
          console.log('Ocurrio un error:', err.error.message);
        } else {
          console.log(`El servidor respondio: ${err.status}, body was: ${err.error}`);
        }
      }
    );
  }

  // Esta funcion obtiene una solicitud por su codigo
  onOpenOrden(codigo_orden: string): void {
    this.router.navigate(['/sc/orden/detailoc/' + codigo_orden]);
    // alert(codigo_solicitud);
  }

  irAConversaciones(codigo_orden: string): void {
    this.router.navigate(['/sc/orden/notify/' + codigo_orden]);
  }


  // Esta funcion te envia al formulario de Nueva Orden de Compra
  onOpenAddOrden(codigo_solicitud: string): void {
    // alert(codigo_solicitud);
    this.router.navigate(['/sc/orden/add/' + codigo_solicitud]);
  }

  // Opciones para filtrado de Listado

  onLoadListado() {
    this.openLoading();
    this.lorden = [];
    this.servOC.getListadoOrdenXEstadoSG(this.estado_autorizacion_subgerencia).subscribe(
      data => {
        this.closeLoading();
        if (data['length'] > 0) {
          this.lorden = data['body'];
          // this.toast.show('Se trajo ' + data['length'] + ' solicitudes', 2000, 'green');
        }else {
          this.toast.show('No tiene solicitudes!', 1000, 'red');
        }
        console.log(data);
      },
      (err: HttpErrorResponse) => {
        this.closeLoading();
        this.toast.show('Ocurrio un error al obtener las solicitudes!', 1000, 'red');
        if (err.error instanceof Error) {
          console.log('Ocurrio un error:', err.error.message);
        } else {
          console.log(`El servidor respondio: ${err.status}, body was: ${err.error}`);
        }
      }
    );
  }

  //#region Funciones para anular la solicitud
  onLoadAnularOrden(codigo_orden: string): void {
    this.aorden = new RequestAnulacionSolicitud();
    this.aorden.codigo_solicitud = codigo_orden;
    this.aorden.usuario_anulacion = localStorage.getItem('username');
    // this.onGuardarAnularOrden();
  }

  onGuardarAnularOrden() {
    this.openLoading();
    this.servOC.saveAnularOrden(this.aorden).subscribe(
      data => {
        this.closeLoading();
        this.toast.show('Se anulo la orden!', 1000, 'green');
        this.estado_autorizacion_subgerencia = 'T';
        this.onLoadListado();
      },
      (err: HttpErrorResponse) => {
        this.closeLoading();
        this.toast.show('Ocurrio un error al anular la orden. Intente nuevamente!', 1000, 'red');
        if (err.error instanceof Error) {
          console.log('Ocurrio un error:', err.error.message);
        } else {
          console.log(`El servidor respondio: ${err.status}, body was: ${err.error}`);
        }
      }
    );
  }
  //#endregion

  // Funcion para generar los archivos que se subiran al SAP
  generarArchivosSubidaSAP() {
    this.openLoading();
    this.servOC.generarArchivosParaSAP().subscribe(
      data => {
        this.closeLoading();
        this.toast.show('Se Genero los archivos correctamente!', 1000, 'green');
        // this.onLoadListado();
        this.onGetOrdenesCompra();
        this.onVerificaEstadoTransferenciaOC();
      },
      (err: HttpErrorResponse) => {
        this.closeLoading();
        this.toast.show('Ocurrio un error al crear los archivos. Intente nuevamente!', 1000, 'red');
        if (err.error instanceof Error) {
          console.log('Ocurrio un error:', err.error.message);
        } else {
          console.log(`El servidor respondio: ${err.status}, body was: ${err.error}`);
        }
      }
    );
  }

  // Funciones Loading
  openLoading() {
    const loading = $('#loading');
    loading.fadeIn();
  }

  closeLoading() {
      const loading = $('#loading');
      loading.fadeOut();
  }
}
