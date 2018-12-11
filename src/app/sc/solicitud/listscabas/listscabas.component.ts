import { Component, OnInit } from '@angular/core';
import { SolicitudService } from '../solicitud.service';
import { HttpErrorResponse } from '@angular/common/http';
import { MzToastService } from 'ng2-materialize';
import { Solicitudcompralistado } from '../solicitud';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listscabas',
  templateUrl: './listscabas.component.html',
  styleUrls: ['./listscabas.component.scss'],
})
export class ListscabasComponent implements OnInit {
  lsolicitud: Array<Solicitudcompralistado> = new Array<Solicitudcompralistado>();
  constructor(private servSC: SolicitudService, private toast: MzToastService, private router: Router) { }

  ngOnInit() {
    this.onGetSolicitudes();
  }

  // Esta funcion obtiene las solicitudes del Solicitante
  onGetSolicitudes(): void {
    let username = localStorage.getItem('username');
    this.servSC.getListadoSolicitudXAbastecimiento(username).subscribe(
      data => {
        if (data['length'] > 0) {
          this.lsolicitud = data['body'];
          this.toast.show('Se trajo ' + data['length'] + ' solicitudes', 1000, 'green');
        }else {
          this.toast.show('No tiene solicitudes para autorizar!', 1000, 'red');
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


  // Esta funcion obtiene una solicitud por su codigo
  onOpenSolicitud(codigo_solicitud: string): void {
    this.router.navigate(['/sc/solicitud/detail/' + codigo_solicitud]);
    // alert(codigo_solicitud);
  }

  // Esta funcion te envia al formulario de Nueva Orden de Compra
  onOpenAddOrden(codigo_solicitud: string): void {
    // alert(codigo_solicitud);
    this.router.navigate(['/sc/orden/add/' + codigo_solicitud]);
  }

}
