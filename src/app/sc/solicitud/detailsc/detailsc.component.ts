import { Component, OnInit, ViewChild } from '@angular/core';
import { SolicitudCompra } from '../solicitud';
import { SolicitudService } from '../solicitud.service';
import { HttpErrorResponse } from '@angular/common/http';
import { MzToastService } from 'ng2-materialize';
import { Router, ActivatedRoute } from '@angular/router';
import { Proveedorsc } from '../../proveedorsc';
import { DetalleSolicitud } from '../detallesolicitud';
import { ItemArticuloSc } from '../../itemarticulosc';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-detailsc',
  templateUrl: './detailsc.component.html',
  styleUrls: ['./detailsc.component.scss'],
})
export class DetailscComponent implements OnInit {

//#region VARIABLES PARA MODIFICACIÓN
    modificar: Boolean = false;

//#endregion

    codigo_solicitud: string;
//#region VARIABLES DE VALIDACIÓN
  @ViewChild('form') form: FormGroup;
  submitted = false;

  errorMessagesSolicitud = {
    tipo: {
        required: 'Seleccione el Tipo'
    },
    fecha: {
        required: 'Seleccione la Fecha'
    },
    motivo: {
        required: 'Ingrese un Motivo'
    }
  };
//#endregion

  public opcionesDatePicker: Pickadate.DateOptions = {
    clear: 'Limpiar', // Clear button text
    close: 'OK',    // Ok button text
    today: 'HOY', // Today button text
    closeOnClear: true,
    closeOnSelect: false,
    format: 'yyyy-mm-dd', // Visible date format (defaulted to formatSubmit if provided otherwise 'd mmmm, yyyy')
    formatSubmit: 'yyyy-mm-dd',   // Return value format (used to set/get value)
    // onClose: () => alert('Close has been invoked.'),
    // onOpen: () => alert('Open has been invoked.'),
    selectMonths: true, // Creates a dropdown to control month
    selectYears: 0,    // Creates a dropdown of 10 years to control year,
  };

  public botonSave: Boolean = true;
  tipo_solicitud: string;
  solicitud: SolicitudCompra = new SolicitudCompra();
  proveedores: Array<Proveedorsc> = new Array<Proveedorsc>();
  articulos: Array<ItemArticuloSc> = new Array<ItemArticuloSc>();

  // Variables para detalle de Solicitud
  detallesolicitud: DetalleSolicitud = new DetalleSolicitud();
  ldetallesolicitud: Array<DetalleSolicitud> = new Array<DetalleSolicitud>();
  numero_item: number;
  constructor(private servSC: SolicitudService, private toast: MzToastService, private router: Router, private route: ActivatedRoute) { 
    this.route.params
    .subscribe(params => {
        this.codigo_solicitud = params['id'].toString();
        // this.onLoadUser(atob(this.username));
    });
    this.modificar = false;
  }

  ngOnInit() {
    this.onGeneraCodigo();
    this.onGetProveedores();
    this.onGetItemArticulo();
    this.tipo_solicitud = 'a';
    this.onLoadSolicitudCompra(this.codigo_solicitud);
    // this.onLoadDetalleSolicitudCompra();
    this.onLoadListaDetalleSolicitud();
    this.onLimpiaListaDetalleSolicitud();
    // alert(localStorage.getItem('id_superior'));
    // alert(localStorage.getItem('username'));
  }

  onLoadSolicitudCompra(codigo: string) {
    this.servSC.getSolicitudXCodigo(codigo).subscribe(
        data => {
            this.solicitud = data['body'];
            this.onLoadDetalleSolicitudCompra(codigo)
        },
        (err: HttpErrorResponse) => {
            this.toast.show('No se obtuvo ninguna solicitud, Ocurrio un error!', 3000, 'red');
            if (err.error instanceof Error) {
            console.log('Ocurrio un error:', err.error.message);
            } else {
            console.log(`El servidor respondio: ${err.status}, body was: ${err.error}`);
            }
        }
    );
  }

  onLoadDetalleSolicitudCompra(codigo: string) {
    this.servSC.getDetalleSolicitudXCodigo(codigo).subscribe(
        data => {
            this.ldetallesolicitud = data['body'];
        },
        (err: HttpErrorResponse) => {
            this.toast.show('No se pudo traer el detalle de esta solicitud, intente nuevamente!', 3000, 'red');
            if (err.error instanceof Error) {
            console.log('Ocurrio un error:', err.error.message);
            } else {
            console.log(`El servidor respondio: ${err.status}, body was: ${err.error}`);
            }
        }
    );
  }

// Funcion para Guardar la Cabecera de la solicitud
  onSaveSolicitudCompra(s: SolicitudCompra): void {
    s.autorizador = localStorage.getItem('id_superior');
    s.estado = 'A';
    s.estado_autorizacion_superior = 'P';
    s.motivo_autorizacion = 'NA';
    s.estado_transferencia = 'N';
    s.motivo_anulacion = 'NA';
    s.solicitante = localStorage.getItem('username');
    s.usuario_anulacion = 'NA';
    s.usuario_creacion = localStorage.getItem('username');
    s.usuario_modificacion = localStorage.getItem('username');

    this.servSC.saveSolicitudCompra(s).subscribe(
        data => {
          if (data['status'] == 304) {
              this.toast.show('No se guardo, revise la información', 3000, 'red');
              this.botonSave = true;
          } else {
              this.ldetallesolicitud.forEach(element => {
              this.detallesolicitud = new DetalleSolicitud();
              this.detallesolicitud = element;
              this.detallesolicitud.codigo_solicitud = s.codigo;
              this.detallesolicitud.estado = 'A';
              this.detallesolicitud.tipo_item = s.tipo;
              this.onSaveDetalleSolicitudCompra(this.detallesolicitud);
            });
            this.toast.show('Se guardo correctamente!', 3000, 'green', () => this.router.navigate(['/sc/solicitud/list/']));
          }
        // this.toast.show('Se guardo correctamente!', 3000, 'green', () => this.router.navigate(['/sc/solicitud/list/']));
        console.log(data);
      },
      (err: HttpErrorResponse) => {
        this.toast.show('No se guardo, ocurrio un error!', 3000, 'red');
        if (err.error instanceof Error) {
          console.log('Ocurrio un error:', err.error.message);
        } else {
          console.log(`El servidor respondio: ${err.status}, body was: ${err.error}`);
        }
      }
    );
  }

  onValidaCabeceraSolicitud() {
    if (this.ldetallesolicitud.length > 0) { // Valida si existen items agregados en la solicitud
      // this.toast.show('Guardando' + this.solicitud.codigo, 1000, 'green');
      this.onSaveSolicitudCompra(this.solicitud);
    }else {
      this.toast.show('No existen Items agregados a la solicitud ' + this.solicitud.codigo, 3000, 'red');
    }
  }

  // Funcion para obtener proveedores
  onGetProveedores(): void {
    this.servSC.getProveedoresSC().subscribe(
      data => {
        this.proveedores = data['body'];
        this.toast.show('Se obtuvieron ' + data['length'].toString() + ' proveedores correctamente!', 1000, 'green');
        console.log(data);
      },
      (err: HttpErrorResponse) => {
        this.toast.show('Ocurrio un error al obtener los proveedores!', 3000, 'red');
        if (err.error instanceof Error) {
          console.log('Ocurrio un error:', err.error.message);
        } else {
          console.log(`El servidor respondio: ${err.status}, body was: ${err.error}`);
        }
      }
    );
  }

  // Funcion para obtener Item de Tipo Articulo
  onGetItemArticulo(): void {
    this.servSC.getItemArticuloSC().subscribe(
      data => {
        this.articulos = data['body'];
        this.toast.show('Se obtuvieron ' + data['length'].toString() + ' articulos correctamente!', 1000, 'green');
        console.log(data);
      },
      (err: HttpErrorResponse) => {
        this.toast.show('Ocurrio un error al obtener los proveedores!', 3000, 'red');
        if (err.error instanceof Error) {
          console.log('Ocurrio un error:', err.error.message);
        } else {
          console.log(`El servidor respondio: ${err.status}, body was: ${err.error}`);
        }
      }
    );
  }

  OnLoadDatosProveedor($event): void {
    this.solicitud.nombre_proveedor = $event['CardName'];
    this.solicitud.codigo_proveedor = $event['CardCode'];

    console.log($event);
    console.log(this.solicitud);
  }

  OnLoadDatosArticulo($event): void {
    console.log($event);
    this.detallesolicitud.codigo_item = $event['ItemCode'];
    this.detallesolicitud.descripcion_item = $event['ItemName'];
    this.detallesolicitud.unidad = $event['BuyUnitMsr'];
  }

  // Funciones para Detalle de la Solicitud
  onLimpiaListaDetalleSolicitud(): void {
    this.ldetallesolicitud = new Array<DetalleSolicitud>();
    this.detallesolicitud = new DetalleSolicitud();
    this.numero_item = 0;
  }

  onSaveDetalleSolicitudCompra(ds: DetalleSolicitud): void {
    this.servSC.saveDetalleSolicitudCompra(ds).subscribe(
      data => {
        // this.toast.show('Se guardo correctamente DS!', 3000, 'green');
        console.log(data);
      },
      (err: HttpErrorResponse) => {
        this.toast.show('No se guardo DS!', 3000, 'red');
        if (err.error instanceof Error) {
          console.log('Ocurrio un error:', err.error.message);
        } else {
          console.log(`El servidor respondio: ${err.status}, body was: ${err.error}`);
        }
      }
    );
  }

  /*onLoadDetalleSolicitudCompra(): void {
    this.detallesolicitud.codigo_solicitud = 'SCA0001';
    this.detallesolicitud.codigo_item = 'CC010054';
    this.detallesolicitud.descripcion_item = 'DES01';
    this.detallesolicitud.tipo_item = 'I';
    this.detallesolicitud.fecha_arte = new Date('2018-11-28');
    this.detallesolicitud.fecha_requerida = new Date('2018-11-27');
    this.detallesolicitud.cantidad = 3;
    this.detallesolicitud.unidad = 'Kg';
    this.detallesolicitud.prioridad = 0;
    this.detallesolicitud.estado = 'A';
    this.detallesolicitud.usuario_creacion = 'faruni';
    this.detallesolicitud.fecha_creacion = new Date('2018-11-27');
    this.detallesolicitud.usuario_modificacion = 'faruni';
    this.detallesolicitud.fecha_modificacion = new Date('2018-11-27');
  }*/

  onLoadListaDetalleSolicitud(): void {
    this.ldetallesolicitud = new Array<DetalleSolicitud>();
  }

  onAddItemSolicitud() {
    debugger;
    this.numero_item = this.numero_item + 1;
    this.detallesolicitud.prioridad =  this.numero_item;
    this.detallesolicitud.estado = 'S';
    this.detallesolicitud.usuario_creacion = localStorage.getItem('username');
    this.detallesolicitud.fecha_creacion = new Date('2018-11-27'); // Estos datos solo son para envio ya que se cambian en el servicio
    this.detallesolicitud.usuario_modificacion = localStorage.getItem('username');
    this.detallesolicitud.fecha_modificacion = new Date('2018-11-27'); // Estos datos solo son para envio ya que se cambian en el servicio
    this.ldetallesolicitud.push(this.detallesolicitud);
    this.detallesolicitud = new DetalleSolicitud();
  }

  onQuitarItemSolicitud(codigo: string) {
    let lauxds: Array<DetalleSolicitud> = new Array<DetalleSolicitud>();
    let auxds: DetalleSolicitud = new DetalleSolicitud();
    this.ldetallesolicitud.forEach(element => {
      auxds = new DetalleSolicitud();
      auxds = element;
      if (auxds.codigo_item == codigo) {
      }else {
        lauxds.push(auxds);
      }
    });
    this.ldetallesolicitud = new Array<DetalleSolicitud>();
    this.ldetallesolicitud = lauxds;
    // alert(codigo);
  }

  onGeneraCodigo() {
    let timestamp = + new Date;
    this.solicitud.codigo = timestamp.toString();
  }

  /* Funcion autogenerado por tiempo
  onGeneraCodigo() {
    let timer = Observable.timer(1000, 500);
    timer.subscribe(t => {
      let timestamp = + new Date;
      this.solicitud.codigo = timestamp.toString();
    });
  }
  */


  // Revisar las lineas anteriores talvez no se utilicen en este modulo
  onDirigirConversacion() {
    this.router.navigate(['sc/solicitud/notify/' + this.codigo_solicitud]);
  }
}
