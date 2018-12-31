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
  // vARIABLES DE BUSQUEDA
  term: string = '';
  estado_autorizacion: string;
  // END VARIABLES DE BUSQUEDA

  lorden: Array<OrdenCompraListAbastecimiento> = new Array<OrdenCompraListAbastecimiento>();
  orden: OCOrdenCompra = new OCOrdenCompra();

  constructor(private servSC: SolicitudService, private servOC: OrdenService, private toast: MzToastService, private router: Router) { }

  ngOnInit() {
    this.onGetOrdenesCompra();
  }

  // Esta funcion obtiene las solicitudes del Solicitante
  onGetOrdenesCompra(): void {
    this.servOC.getOrdenCompraAbastecimiento().subscribe(
      data => {
        if (data['length'] > 0) {
          this.lorden = data['body'];
          // this.toast.show('Se trajo ' + data['length'] + ' solicitudes', 2000, 'green');
        }else {
          this.toast.show('No existen Ordenes de Compra!', 1000, 'red');
        }
        console.log(data);
      },
      (err: HttpErrorResponse) => {
        this.toast.show('Ocurrio un error al obtener las Ordenes de Compra!', 1000, 'red');
        if (err.error instanceof Error) {
          console.log('Ocurrio un error:', err.error.message);
        } else {
          console.log(`El servidor respondio: ${err.status}, body was: ${err.error}`);
        }
      }
    );
  }

  // Esta funcion obtiene una solicitud por su codigo
  onOpenSolicitud(codigo_solicitud: string): void {
    this.router.navigate(['/sc/solicitud/detailabas/' + codigo_solicitud]);
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
    this.servSC.getListadoSolicitudXEstado(this.estado_autorizacion).subscribe(
      data => {
        if (data['length'] > 0) {
          this.lorden = data['body'];
          // this.toast.show('Se trajo ' + data['length'] + ' solicitudes', 2000, 'green');
        }else {
          this.toast.show('No tiene solicitudes!', 1000, 'red');
        }
        console.log(data);
      },
      (err: HttpErrorResponse) => {
        this.toast.show('Ocurrio un error al obtener las solicitudes!', 1000, 'red');
        if (err.error instanceof Error) {
          console.log('Ocurrio un error:', err.error.message);
        } else {
          console.log(`El servidor respondio: ${err.status}, body was: ${err.error}`);
        }
      }
    );
  }
}
