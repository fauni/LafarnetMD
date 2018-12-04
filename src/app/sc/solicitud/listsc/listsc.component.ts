import { Component, OnInit } from '@angular/core';
import { SolicitudService } from '../solicitud.service';
import { HttpErrorResponse } from '@angular/common/http';
import { MzToastService } from 'ng2-materialize';
import { Solicitudcompralistado } from '../solicitud';

@Component({
  selector: 'app-listsc',
  templateUrl: './listsc.component.html',
  styleUrls: ['./listsc.component.scss'],
})
export class ListscComponent implements OnInit {
  lsolicitud: Array<Solicitudcompralistado> = new Array<Solicitudcompralistado>();
  constructor(private servSC: SolicitudService, private toast: MzToastService) { }

  ngOnInit() {
    this.onGetSolicitudes();
  }

  onGetSolicitudes(): void {
    let username = localStorage.getItem('username');
    this.servSC.getListadoSolicitudXUsuario(username).subscribe(
      data => {
        if (data['length'] > 0) {
          this.lsolicitud = data['body'];
          this.toast.show('Se trajo ' + data['length'] + ' solicitudes', 2000, 'green');
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
}
