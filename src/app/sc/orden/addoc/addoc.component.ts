import { Component, OnInit } from '@angular/core';
import { SolicitudCompra } from '../../solicitud/solicitud';
import { Proveedorsc } from '../../proveedorsc';
import { ItemArticuloSc } from '../../itemarticulosc';
import { DetalleSolicitud, RequestUpdateDetalleSolicitud } from '../../solicitud/detallesolicitud';
import { Globals } from '../../../globals';
import { SolicitudService } from '../../solicitud/solicitud.service';
import { MzToastService } from 'ng2-materialize';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { OCOrdenCompra, OCTipoCompraEncargado } from '../orden';
import { OrdenService } from '../orden.service';
import { Users } from '../../../admin-intranet/users/users';
import { UsersService } from '../../../admin-intranet/users/users.service';
import { Comunes } from '../../../comunes';
import { DetalleOrden } from '../detalleorden';

@Component({
  selector: 'app-addoc',
  templateUrl: './addoc.component.html',
  styleUrls: ['./addoc.component.scss'],
})
export class AddocComponent implements OnInit {
  codigo_solicitud: string;
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
  //#endregion
  constructor(
    private comunes: Comunes,
    private global: Globals,
    private servSC: SolicitudService,
    private servOC: OrdenService,
    private toast: MzToastService,
    private servUsers: UsersService,
    private router: Router, private route: ActivatedRoute) {
      this.route.params.subscribe(params => {
        this.codigo_solicitud = params['id'].toString();
        // this.onLoadUser(atob(this.username));
    });
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
    this.onLoadSolicitudCompra(this.codigo_solicitud);
    // this.onLoadDetalleSolicitudCompra();
  }
  onValoresPorDefecto() {
    this.detallesolicitud.fecha_arte = new Date('1990-01-01');
    this.detallesolicitudservicio.fecha_arte = new Date('1990-01-01');
  }

  onLoadOrdenCompra(s: SolicitudCompra) {
    // this.orden = new OCOrdenCompra();
    this.orden.fecha_orden = new Date(this.comunes.obtenerFechaActual());
    this.orden.tipo_orden = s.tipo;
    this.orden.codigo_proveedor = s.codigo_proveedor;
    this.orden.nombre_proveedor = s.nombre_proveedor;
    this.orden.solicitante = s.solicitante;
    this.orden.tipo_compra = s.tipo_compra;
    this.orden.solicitante  = this.solicitud.solicitante;
    this.onLoadUsuarioForUsername(this.orden.solicitante);
    this.onLoadTipoCompraEncargado();
    this.orden.usuario_creacion = localStorage.getItem('username');
    this.orden.usuario_modificacion = localStorage.getItem('username');
    this.orden.monto_total = 0;
  }

  onLoadSolicitudCompra(codigo: string) {
    this.servSC.getSolicitudXCodigo(codigo).subscribe(
        data => {
            this.solicitud = data['body'];
            if (this.solicitud.estado_autorizacion_superior == 'A') {
              this.onLoadDetalleSolicitudCompra(codigo);
              this.onLoadOrdenCompra(this.solicitud);
            } else {
              this.toast.show('Esta solicitud no se encuentra Aprobada', 1000, 'red', () => this.router.navigate(['/sc/orden/solicitud']));
            }
            // this.closeLoading();
        },
        (err: HttpErrorResponse) => {
            this.toast.show('No se obtuvo ninguna solicitud, Ocurrio un error!', 1000, 'red');
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
        this.ldetallesolicitudservicio = data['body'];
        this.onLoadDetalleOrdenCompra(data['body']);
      },
      (err: HttpErrorResponse) => {
          this.toast.show('No se pudo traer el detalle de esta solicitud, intente nuevamente!', 500, 'red');
          if (err.error instanceof Error) {
            console.log('Ocurrio un error:', err.error.message);
          } else {
            console.log(`El servidor respondio: ${err.status}, body was: ${err.error}`);
          }
      }
    );
  }

  onLoadDetalleOrdenCompra(items: Array<DetalleSolicitud>) {
    this.ldetalleordenA = new Array<DetalleOrden>();
    this.ldetalleordenS = new Array<DetalleOrden>();
    let item: DetalleOrden; // Item para detalle de orden de compra
    let itemsol: DetalleSolicitud; // Item para detalle de solicitud de compra

    // para la prioridad del item y permite editar campos
    this.numero_item = 0;

    items.forEach(element => {
      itemsol = new DetalleSolicitud();
      item = new DetalleOrden();
      itemsol = element;
      this.numero_item = this.numero_item + 1;

      item.id_detalle_solicitud = itemsol.id_detalle_solicitud;
      item.codigo_solicitud = itemsol.codigo_solicitud;
      item.codigo_orden = this.orden.codigo_orden;
      item.codigo_item = itemsol.codigo_item;
      item.descripcion_item = itemsol.descripcion_item;
      item.tipo_item = itemsol.tipo_item;
      item.fecha_arte = itemsol.fecha_arte;
      item.fecha_requerida = itemsol.fecha_requerida;
      item.cantidad = itemsol.cantidad;
      item.unidad = itemsol.unidad;
      item.precio_unitario = 0;
      item.sub_total = item.cantidad * item.precio_unitario;
      item.estado = 'A';
      item.prioridad = this.numero_item;

      item.usuario_creacion = localStorage.getItem('username');
      item.usuario_modificacion = localStorage.getItem('username');

      if (this.orden.tipo_orden == 'I') {
        if (itemsol.estado == 'A') { this.ldetalleordenA.push(item); }
      } else {
        if (itemsol.estado == 'A') { this.ldetalleordenS.push(item); }
      }
    });
    if (this.ldetalleordenA.length === 0 && this.orden.tipo_orden == 'I') {
      this.toast.show('Todos los Ítems de esta solicitud ya se encuentran procesadas.', 2000, 'red', () => this.router.navigate(['/sc/solicitud/list_abast']));
    }
    if (this.ldetalleordenS.length === 0 && this.orden.tipo_orden == 'S') {
      this.toast.show('Todos los Ítems de esta solicitud ya se encuentran procesadas.', 2000, 'red', () => this.router.navigate(['/sc/solicitud/list_abast']));
    }
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
      }
    );
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

  onGeneraCodigo() {
    let timestamp = + new Date;
    this.orden.codigo_orden = timestamp.toString();
    // alert(this.orden.codigo_orden);
  }

  onValidaCabeceraOrden() {

    // let uencargado: Users = new Users();
    // this.orden.solicitante = usolicitante.first_name + ' ' + usolicitante.last_name;
    // usolicitante = this.onLoadUsuarioForUsername(this.solicitud.solicitante);
    this.orden.estado = 'A';
    this.orden.estado_transferencia = 'N';
    this.orden.direccion_proveedor = 'NA';

    this.onSaveOrdenCompra(this.orden);
  }

  onSaveOrdenCompra(o: OCOrdenCompra) {
    this.openLoading();
    this.servOC.saveOrdenCompra(o).subscribe(
      data => {
        this.closeLoading();
        if (this.orden.tipo_orden == 'I') {
          this.onSaveDetalleOrdenCompra(this.ldetalleordenA);
        } else {
          this.onSaveDetalleOrdenCompra(this.ldetalleordenS);
        }
        console.log(data);
        this.toast.show('Se guardo correctamente!', 500, 'green', () => this.router.navigate(['/sc/orden/list']) );
      },
      (err: HttpErrorResponse) => {
        this.closeLoading();
        this.toast.show('No se guardo la orden de compra, ocurrio un error!', 1000, 'red');
        if (err.error instanceof Error) {
          console.log('Ocurrio un error:', err.error.message);
        } else {
          console.log(`El servidor respondio: ${err.status}, body was: ${err.error}`);
        }
      }
    );
  }

  //#region DETALLE DE ORDEN DE COMPRA
  onQuitarDetalleOrdenCompra(doc: DetalleOrden) {
    if (this.orden.tipo_orden == 'I') {
      if (this.ldetalleordenA.find(x => x == doc)) { this.ldetalleordenA.splice(this.ldetalleordenA.indexOf(doc), 1); }
    } else {
      if (this.ldetalleordenS.find(x => x == doc)) { this.ldetalleordenS.splice(this.ldetalleordenS.indexOf(doc), 1); }
    }
  }
  onSaveDetalleOrdenCompra(ldetalle: Array<DetalleOrden>) {
    this.openLoading();
    let detalle: DetalleOrden = new DetalleOrden();
    let requestDS: RequestUpdateDetalleSolicitud = new RequestUpdateDetalleSolicitud();
    ldetalle.forEach(element => {
      detalle = new DetalleOrden();
      detalle = element;

      if (detalle.tipo_item == 'I') {
        detalle.sub_total = detalle.cantidad * detalle.precio_unitario;
      }

      requestDS = new RequestUpdateDetalleSolicitud();
      requestDS.codigo_solicitud = detalle.codigo_solicitud;
      requestDS.id_detalle_solicitud = detalle.id_detalle_solicitud;
      requestDS.usuario_modificacion = localStorage.getItem('username');
      requestDS.estado  = 'X'; // Cambia el estado de A a X que indica que ya se tomo en cuenta en una orden de compra
      this.servOC.saveDetalleOrdenCompra(detalle).subscribe(
        data => {
          this.closeLoading();
          console.log(data);
          this.updateEstadoDetalleSolicitud(requestDS);
          // this.toast.show('Se guardo correctamente el detalle de la orden!', 1000, 'green');
        },
        (err: HttpErrorResponse) => {
          this.closeLoading();
          this.toast.show('No se guardo el detalle de la orden de compra, ocurrio un error!', 1000, 'red');
          if (err.error instanceof Error) {
            console.log('Ocurrio un error:', err.error.message);
          } else {
            console.log(`El servidor respondio: ${err.status}, body was: ${err.error}`);
          }
        }
      );
    });
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
  //#endregion
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
  //#endregion
  calculaTotal() {
    debugger;
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

  //#region AGREGAR NUEVOS ARTICULOS DE OTRA SOLICITUD
  onSeleccionaItemArticulo(ds: DetalleSolicitud) {
    if (this.addarraydetalle.find(x => x == ds)) {
      this.addarraydetalle.splice(this.addarraydetalle.indexOf(ds), 1);
    } else {
      this.addarraydetalle.push(ds);
    }
    console.log(this.addarraydetalle);
  }

  AddOrden(accion: string) {
    if (accion == 'C') {
      this.addarraydetalle = [];
    } else {
      this.addarraydetalle.forEach(element => {
        let dorden: DetalleOrden = new DetalleOrden();

        this.numero_item = this.numero_item + 1;
        dorden.id_detalle_solicitud = element.id_detalle_solicitud;
        dorden.codigo_solicitud = element.codigo_solicitud;
        dorden.codigo_orden = this.orden.codigo_orden;
        dorden.codigo_item = element.codigo_item;
        dorden.descripcion_item = element.descripcion_item;
        dorden.tipo_item = element.tipo_item;
        dorden.fecha_arte = element.fecha_arte;
        dorden.fecha_requerida = element.fecha_requerida;
        dorden.cantidad = element.cantidad;
        dorden.unidad = element.unidad;
        dorden.precio_unitario = 0;
        dorden.sub_total = dorden.cantidad * dorden.precio_unitario;
        dorden.estado = 'A';
        dorden.prioridad = this.numero_item;

        dorden.usuario_creacion = localStorage.getItem('username');
        dorden.usuario_modificacion = localStorage.getItem('username');
        if (element.tipo_item == 'S') {
          this.ldetalleordenS.push(dorden);
        } else {
          this.ldetalleordenA.push(dorden);
        }
      });
    }
  }

  OpenAddDetalleOrden(tipo: string) {
    this.search_codigo_solicitud = '';
    this.addarraydetalle = [];
    if (tipo == 'I') {
      this.ldetallesolicitud = [];
    } else {
      this.ldetallesolicitudservicio = [];
    }
  }

  buscarSolicitud() {
    this.openLoading();
    this.servSC.getDetalleSolicitudXCodigo(this.search_codigo_solicitud).subscribe(
      data => {
        this.closeLoading();
        this.ldetallesolicitud = data['body'];
        this.ldetallesolicitudservicio = data['body'];
      },
      (err: HttpErrorResponse) => {
        this.closeLoading();
        this.toast.show('No se pudo traer los Items de esta solicitud, intente nuevamente!', 500, 'red');
        if (err.error instanceof Error) {
          console.log('Ocurrio un error:', err.error.message);
        } else {
          console.log(`El servidor respondio: ${err.status}, body was: ${err.error}`);
        }
      }
    );
  }
  //#endregion

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
