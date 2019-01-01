import { Component, OnInit } from '@angular/core';
import { Globals } from '../../../globals';
import { SolicitudService } from '../../solicitud/solicitud.service';
import { OrdenService } from '../orden.service';
import { MzToastService } from 'ng2-materialize';
import { Router, ActivatedRoute } from '@angular/router';
import { OCOrdenCompra, OCTipoCompraEncargado } from '../orden';
import { DetalleOrden } from '../detalleorden';
import { DetalleSolicitud, RequestUpdateDetalleSolicitud } from '../../solicitud/detallesolicitud';
import { SolicitudCompra } from '../../solicitud/solicitud';
import { Proveedorsc } from '../../proveedorsc';
import { ItemArticuloSc } from '../../itemarticulosc';
import { Comunes } from '../../../comunes';
import { UsersService } from '../../../admin-intranet/users/users.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Users } from '../../../admin-intranet/users/users';

@Component({
  selector: 'app-detailoc',
  templateUrl: './detailoc.component.html',
  styleUrls: ['./detailoc.component.scss'],
})
export class DetailocComponent implements OnInit {
    codigo_orden: string = '';
    modificar: Boolean;

    errorMessagesSolicitud = {
    };
  
    //#region Opciones Calendario
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
    //#endregion
    solicitud: SolicitudCompra = new SolicitudCompra();
    proveedores: Array<Proveedorsc> = new Array<Proveedorsc>();
    articulos: Array<ItemArticuloSc> = new Array<ItemArticuloSc>();

    // Variables para detalle de Solicitud
    detallesolicitud: DetalleSolicitud = new DetalleSolicitud(); // OBJETO ARTICULOS
    detallesolicitudservicio: DetalleSolicitud = new DetalleSolicitud(); // OBJETO SERVICIOS
    ldetallesolicitud: Array<DetalleSolicitud> = new Array<DetalleSolicitud>(); // lista detalle articulos
    ldetallesolicitudservicio: Array<DetalleSolicitud> = new Array<DetalleSolicitud>(); // lista detalle servicios

    numero_item: number;

    // Variables de Ordenes de Compra
    orden: OCOrdenCompra = new OCOrdenCompra();
    lencargados: Array<OCTipoCompraEncargado> = new Array<OCTipoCompraEncargado>();
    camposdeshabilitados: Boolean;

    // End Variables de Ordenes de Compra
    //#region Variables de Detalle de Orden de Compra
    ldetalleordenA: Array<DetalleOrden> = new Array<DetalleOrden>();
    ldetalleordenS: Array<DetalleOrden> = new Array<DetalleOrden>();
    //#endregion

    //#region VARIABLES AGREGAR ARTICULOS O SERVICIOS
    addarraydetalle: DetalleSolicitud[] = [];
    search_codigo_solicitud: string = '';

    constructor(
        private comunes: Comunes,
        private global: Globals,
        private servSC: SolicitudService,
        private servOC: OrdenService,
        private toast: MzToastService,
        private servUsers: UsersService,
        private router: Router, private route: ActivatedRoute) {
            this.route.params.subscribe(params => {
            this.codigo_orden = params['id'].toString();
            // this.onLoadUser(atob(this.username));
            });
            this.modificar = false;
    }

    // Variables para editar cantidad
    EditRowID: any = '';
    Edit(val) {
        this.EditRowID = val;
        this.calculaTotal();
    }

    ngOnInit() {
        this.camposdeshabilitados = true;
        this.openLoading();
        this.onGeneraCodigo();
        this.onGetProveedores();
        this.onGetItemArticulo();
        this.onGetOrdenCompra();
    }

    onDirigirConversacion() {
        this.router.navigate(['sc/orden/notify/' + this.codigo_orden]);
    }

    calculaTotal() {
        let sub_total: number = 0;
        let total: number = 0;
        if (this.orden.tipo_orden == 'I') {
          this.ldetalleordenA.forEach(element => {
            sub_total = element.cantidad * element.precio_unitario;
            total = total + sub_total;
          });
          this.orden.monto_total = total;
        } else {
          this.ldetalleordenS.forEach(element => {
            sub_total = element.sub_total;
            total = total + sub_total;
          });
          this.orden.monto_total = total;
        }
    }

    // Funcion que permite generar un Código Aleatorio
    onGeneraCodigo() {
        let timestamp = + new Date;
        this.orden.codigo_orden = timestamp.toString();
        // alert(this.orden.codigo_orden);
    }

    // Funcion para obtener proveedores
    onGetProveedores(): void {
        this.servSC.getProveedoresSC().subscribe(
        data => {
            this.proveedores = data['body'];
            // this.toast.show('Se obtuvieron ' + data['length'].toString() + ' proveedores correctamente!', 1000, 'green');
            console.log(data);
        },
        (err: HttpErrorResponse) => {
            this.toast.show('Ocurrio un error al obtener los proveedores!', 1000, 'red');
            if (err.error instanceof Error) {
            console.log('Ocurrio un error:', err.error.message);
            } else {
            console.log(`El servidor respondio: ${err.status}, body was: ${err.error}`);
            }
        });
    }

    // Funcion para obtener Item de Tipo Articulo
    onGetItemArticulo(): void {
        this.servSC.getItemArticuloSC().subscribe(
        data => {
            this.closeLoading();
            this.articulos = data['body'];
            // this.toast.show('Se obtuvieron' + data['length'].toString() + ' articulos correctamente!', 1000, 'green');
            console.log(data);
        },
        (err: HttpErrorResponse) => {
            this.closeLoading();
            this.toast.show('Ocurrio un error al obtener los articulos!', 1000, 'red');
            if (err.error instanceof Error) {
            console.log('Ocurrio un error:', err.error.message);
            } else {
            console.log(`El servidor respondio : ${err.status}, body was: ${err.error}`);
            }
        }
        );
    }

    OnLoadDatosProveedor($event): void {
        this.orden.nombre_proveedor = $event['CardName'];
        this.orden.codigo_proveedor = $event['CardCode'];

        // console.log($event);
        // console.log(this.solicitud);
    }

    OnLoadDatosArticulo($event): void {
        console.log($event);
        this.detallesolicitud.codigo_item = $event['ItemCode'];
        this.detallesolicitud.descripcion_item = $event['ItemName'];
        this.detallesolicitud.unidad = $event['BuyUnitMsr'];
    }

    onLoadTipoCompraEncargado(): void {
        this.openLoading();
        this.servOC.getTipoOrdenCompraEncargado().subscribe(
          data => {
            this.closeLoading();
            this.lencargados = data['body'];
            this.onLoadEncargadoCompra(this.orden.tipo_compra);
            // this.orden.nombre_encargado_compra = usuario.first_name + ' ' + usuario.last_name;
          },
          (err: HttpErrorResponse) => {
            this.closeLoading();
            this.toast.show('No se pudo obtener información del Encargado, ocurrio un error!', 1000, 'red');
            if (err.error instanceof Error) {
              console.log('Ocurrio un error:', err.error.message);
            } else {
              console.log(`El servidor respondio: ${err.status}, body was: ${err.error}`);
            }
          }
        );
    }

    onLoadEncargadoCompra(codigo: string): void {
        let encargado: OCTipoCompraEncargado = new OCTipoCompraEncargado();
        this.openLoading();
        this.servOC.getTipoOrdenCompraEncargadoSingle(codigo).subscribe(
          data => {
            this.closeLoading();
            encargado = data['body'];
            this.orden.encargado_compra = encargado.username;
            this.orden.nombre_encargado_compra = encargado.nombre_encargado;
            // this.orden.nombre_encargado_compra = usuario.first_name + ' ' + usuario.last_name;
          },
          (err: HttpErrorResponse) => {
            this.closeLoading();
            this.toast.show('No se pudo obtener información del Encargado, ocurrio un error!', 1000, 'red');
            if (err.error instanceof Error) {
              console.log('Ocurrio un error:', err.error.message);
            } else {
              console.log(`El servidor respondio: ${err.status}, body was: ${err.error}`);
            }
          }
        );
    }

    updateEstadoDetalleSolicitud(request: RequestUpdateDetalleSolicitud) {
        this.servSC.updateEstadoDetalleSolicitud(request).subscribe(
          data => {
            this.closeLoading();
            console.log(data);
            // this.toast.show('Se guardo correctamente el detalle de la orden!', 1000, 'green');
          },
          (err: HttpErrorResponse) => {
            this.closeLoading();
            this.toast.show('No se pudo cambiar el estado del detalle de la solicitud, ocurrio un error!', 1000, 'red');
            if (err.error instanceof Error) {
              console.log('Ocurrio un error:', err.error.message);
            } else {
              console.log(`El servidor respondio: ${err.status}, body was: ${err.error}`);
            }
          }
        );
    }

    onLoadUsuarioForUsername(username: string): void {
        this.openLoading();
        let usuario = new Users();
        this.servUsers.getUser(username).subscribe(
          data => {
            this.closeLoading();
            usuario = data['body'][0];
            this.orden.nombre_solicitante = usuario.first_name + ' ' + usuario.last_name;
            if (usuario.id_regional == '11') {
              this.orden.autorizador_sub = 'mzeballos';
            }else {
              this.orden.autorizador_sub = 'jocampod';
            }
            this.orden.autorizador_gerencia = 'jocampo';
          },
          (err: HttpErrorResponse) => {
            this.closeLoading();
            this.toast.show('No se pudo obtener información del solicitante, ocurrio un error!', 1000, 'red');
            if (err.error instanceof Error) {
              console.log('Ocurrio un error:', err.error.message);
            } else {
              console.log(`El servidor respondio: ${err.status}, body was: ${err.error}`);
            }
          }
        );
    }

    //#region ENCARGADOS
    selectEncargado() {
        this.onLoadEncargadoCompra(this.orden.tipo_compra);
        // this.orden.encargado_compra = encargado;

        // this.onLoadEncargadoForUsername(usernameE);
        // alert(usernameE);
        console.log(this.orden.tipo_compra);
    }

    // Funcion para obtener la orden de compra
    onGetOrdenCompra(): void {
        this.servOC.getOrdenXCodigo(this.codigo_orden).subscribe(
        data => {
            this.closeLoading();
            this.onGetDetalleOrdenCompra();
            this.orden = data['body'];
            this.onLoadUsuarioForUsername(this.orden.solicitante);
            this.onLoadTipoCompraEncargado();
            // this.toast.show('Se obtuvieron ' + data['length'].toString() + ' proveedores correctamente!', 1000, 'green');
            console.log(data);
        },
        (err: HttpErrorResponse) => {
            this.closeLoading();
            this.toast.show('Ocurrio un error al obtener la orden de compra!', 5000, 'red');
            if (err.error instanceof Error) {
            console.log('Ocurrio un error:', err.error.message);
            } else {
            console.log(`El servidor respondio: ${err.status}, body was: ${err.error}`);
            }
        });
    }

    onGetDetalleOrdenCompra(): void {
        this.openLoading();
        this.servOC.getDetalleOrdenXCodigo(this.codigo_orden).subscribe(
        data => {
            this.closeLoading();
            if (this.orden.tipo_orden == 'I') {
                this.ldetalleordenA = data['body'];
            } else {
                this.ldetalleordenS = data['body'];
            }
            // this.toast.show('Se obtuvieron ' + data['length'].toString() + ' proveedores correctamente!', 1000, 'green');
            console.log(data);
        },
        (err: HttpErrorResponse) => {
            this.closeLoading();
            this.toast.show('Ocurrio un error al obtener la orden de compra!', 5000, 'red');
            if (err.error instanceof Error) {
            console.log('Ocurrio un error:', err.error.message);
            } else {
            console.log(`El servidor respondio: ${err.status}, body was: ${err.error}`);
            }
        });
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
