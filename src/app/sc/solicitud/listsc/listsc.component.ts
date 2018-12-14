import { Component, OnInit } from '@angular/core';
import { SolicitudService } from '../solicitud.service';
import { HttpErrorResponse } from '@angular/common/http';
import { MzToastService } from 'ng2-materialize';
import { Solicitudcompralistado, SolicitudCompra, RequestAnulacionSolicitud } from '../solicitud';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listsc',
  templateUrl: './listsc.component.html',
  styleUrls: ['./listsc.component.scss'],
})
export class ListscComponent implements OnInit {
  lsolicitud: Array<Solicitudcompralistado> = new Array<Solicitudcompralistado>();
  solicitud: SolicitudCompra = new SolicitudCompra();

  // Anulacion de Solicitud
  asolicitud: RequestAnulacionSolicitud = new RequestAnulacionSolicitud();

  constructor(private servSC: SolicitudService, private toast: MzToastService, private router: Router) { }

  ngOnInit() {
    this.onGetSolicitudes();
  }

  // Esta funcion obtiene las solicitudes del Solicitante
  onGetSolicitudes(): void {
    let username = localStorage.getItem('username');
    this.servSC.getListadoSolicitudXUsuario(username).subscribe(
      data => {
        if (data['length'] > 0) {
          this.lsolicitud = data['body'];
          // this.toast.show('Se trajo ' + data['length'] + ' solicitudes', 2000, 'green');
        }else {
          this.toast.show('No tiene solicitudes!', 2000, 'red');
        }
        console.log(data);
      },
      (err: HttpErrorResponse) => {
        this.toast.show('Ocurrio un error al obtener las solicitudes!', 2000, 'red');
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
    this.router.navigate(['/sc/solicitud/detail/' + codigo_solicitud]);
    // alert(codigo_solicitud);
  }

  irAConversaciones(codigo_solicitud: string): void {
    this.router.navigate(['/sc/solicitud/notify/' + codigo_solicitud]);
  }


  //#region Funciones para anular la solicitud

  onLoadAnularSolicitud(codigo_solicitud: string): void {
    this.asolicitud = new RequestAnulacionSolicitud();
    this.asolicitud.codigo_solicitud = codigo_solicitud;
    this.asolicitud.usuario_anulacion = localStorage.getItem('username');
  }

  onGuardarAnularSolicitud() {
    this.servSC.saveAnularSolicitud(this.asolicitud).subscribe(
      data => {
        this.onGetSolicitudes();
        this.toast.show('Se anulo la solicitud!', 1000, 'green');
      },
      (err: HttpErrorResponse) => {
        this.toast.show('Ocurrio un error al anular la solicitud. Intente nuevamente!', 1000, 'red');
        if (err.error instanceof Error) {
          console.log('Ocurrio un error:', err.error.message);
        } else {
          console.log(`El servidor respondio: ${err.status}, body was: ${err.error}`);
        }
      }
    );
  }
  //#endregion
}
