import { Component, OnInit } from '@angular/core';
import { SolicitudCompra } from '../solicitud';
import { SolicitudService } from '../solicitud.service';
import { HttpErrorResponse } from '@angular/common/http';
import { MzToastService } from 'ng2-materialize';
import { Router } from '@angular/router';
import { Proveedorsc } from '../../proveedorsc';

@Component({
  selector: 'app-addsc',
  templateUrl: './addsc.component.html',
  styleUrls: ['./addsc.component.scss'],
})
export class AddscComponent implements OnInit {
  public botonSave: Boolean = true;
  tipo_solicitud: string;
  solicitud: SolicitudCompra = new SolicitudCompra();
  proveedores: Proveedorsc = new Proveedorsc();

  constructor(private servSC: SolicitudService, private toast: MzToastService, private router: Router) { }

  ngOnInit() {
    this.onGetProveedores();
    this.tipo_solicitud = 'a';
    this.onLoadSolicitudCompra();
  }

  onLoadSolicitudCompra() {
    this.solicitud.codigo = 'SCA003';
    this.solicitud.tipo = 'A';
    this.solicitud.estado = 'C';
    this.solicitud.estado_transferencia = 'N';
    this.solicitud.fecha = new Date('2018-11-27');
    this.solicitud.motivo = 'URGENTE';
    this.solicitud.usuario_anulacion = 'NA';
    this.solicitud.motivo_anulacion = 'NA';
    this.solicitud.fecha_anulacion = new Date('2018-11-27');
    this.solicitud.solicitante = 'faruni';
    this.solicitud.autorizador = 'mfloresr';
    this.solicitud.estado_autorizacion_superior = 'P';
    this.solicitud.fecha_autorizacion_superior = new Date('2018-11-27');
    this.solicitud.motivo_autorizacion = 'NA';
    this.solicitud.tipo_compra = 'I';
    this.solicitud.codigo_proveedor = 'PROV003';
    this.solicitud.nombre_proveedor = 'PROVEEDORE PRUEBA';
    this.solicitud.usuario_creacion = 'faruni';
    this.solicitud.fecha_creacion = new Date('2018-11-27');
    this.solicitud.usuario_modificacion = 'faruni';
    this.solicitud.fecha_modificacion = new Date('2018-11-27');
  }

// Funcion para Guardar la Cabecera de la solicitud

  onSaveSolicitudCompra(): void {
    this.servSC.saveSolicitudCompra(this.solicitud).subscribe(
      data => {
        this.toast.show('Se guardo correctamente!', 3000, 'green rounded', () => this.router.navigate(['/sc/solicitud/list/']));
        console.log(data);
      },
      (err: HttpErrorResponse) => {
        this.toast.show('No se guardo!', 3000, 'red rounded');
        if (err.error instanceof Error) {
          console.log('Ocurrio un error:', err.error.message);
        } else {
          console.log(`El servidor respondio: ${err.status}, body was: ${err.error}`);
        }
      }
    );
  }

  onValidaCabeceraSolicitud() {
    this.botonSave = false;
    this.onSaveSolicitudCompra();
  }

  // Funcion para obtener proveedores
  onGetProveedores(): void {
    this.servSC.getProveedoresSC().subscribe(
      data => {
        this.proveedores = data['body'];
        this.toast.show('Se obtuvieron ' + data['length'].toString() + ' proveedores correctamente!', 1000, 'green rounded');
        console.log(data);
      },
      (err: HttpErrorResponse) => {
        this.toast.show('Ocurrio un error al obtener los proveedores!', 3000, 'red rounded');
        if (err.error instanceof Error) {
          console.log('Ocurrio un error:', err.error.message);
        } else {
          console.log(`El servidor respondio: ${err.status}, body was: ${err.error}`);
        }
      }
    );
  }
}
