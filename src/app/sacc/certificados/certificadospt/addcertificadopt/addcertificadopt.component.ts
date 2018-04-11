import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Globals } from '../../../../globals';
import { CompleterService, CompleterData } from 'ng2-completer';
import { HttpErrorResponse } from '@angular/common/http/src/response';
import { CompleterItem } from 'ng2-completer/components/completer-item';
import { NotificationsService } from 'angular2-notifications';
import { Certificados } from '../../certificados';
import { Analista } from '../../../datos/analista/analista';
import { AnalistasService } from '../../../datos/analista/analista.service';
import { ProductosService } from '../../../datos/productos/productos.service';
import { Productos } from '../../../datos/productos/productos';
import { AsignacionService } from '../../../asignacion/asignacion.service';
import { Caracteristicas } from '../../../asignacion/caracteristicas';

@Component({
  selector: 'app-addcertificadopt',
  templateUrl: './addcertificadopt.component.html',
  styleUrls: ['./addcertificadopt.component.scss']
})
export class AddcertificadoptComponent implements OnInit {
  analistas: Array<Analista>;
  productos: Array<Productos>;
  certificado: Certificados;
  analistaData: CompleterData;
  productosData: CompleterData;

  producto: Productos;
  analista: Analista;

  // Lista de Caracteristicas Caracteristicas Fisicas, Analis QUimico, Analisis Microbiologico
  lcf: Array<Caracteristicas>;
  laq: Array<Caracteristicas>;
  lcm: Array<Caracteristicas>;

  cf: Caracteristicas;
  aq: Caracteristicas;
  cm: Caracteristicas;

  options: Pickadate.DateOptions = {
    clear: 'Borrar', // Clear button text
    close: 'Ok',    // Ok button text
    today: 'Hoy', // Today button text
    closeOnClear: true,
    closeOnSelect: false,
    format: 'yyyy-mm-dd',
    //formatSubmit: 'yyyy-mm-dd',
    //onClose: () => alert('Cerraste el picker.'),
    //onOpen: () => alert('abriste el picker.'),
    selectMonths: true, // Creates a dropdown to control month
    selectYears: 10,    // Creates a dropdown of 10 years to control year,
  };
  resp: any;
  constructor(
    private router: Router,
    private servAnalista: AnalistasService,
    private servProductos: ProductosService,
    private servNotification: NotificationsService,
    public global: Globals,
    private completerService: CompleterService,
    private servAsignacion: AsignacionService) {
      this.certificado = new Certificados();
      this.producto = new Productos();

      // Inicializamos lista de caracteristicas
      this.lcf = new  Array<Caracteristicas>();
      this.laq = new  Array<Caracteristicas>();
      this.lcm = new  Array<Caracteristicas>();
    }

  ngOnInit() {
    this.openLoading();
    this.onLoadAnalistas();
    this.onLoadProductos();
  }

  onLoadAnalistas(): void {
      this.analistas = new Array<Analista>();
      this.servAnalista.getAnalistas().subscribe(
      data => {
        this.analistas = data.body;
        console.log('Analistas cargados correctamente');
        this.analistaData = this.completerService.local(this.analistas, 'nombre_completo', 'nombre_completo');
        console.log('------------------------------------>');
        console.log(this.analistaData);
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
  onLoadProductos() {
    this.productos = new Array<Productos>();
    this.servProductos.getProductosForTipo('PT').subscribe(
      data => {
        this.closeLoading();
        this.productos = data.body;
        console.log('Productos cargados correctamente! ---->');
        this.productosData = this.completerService.local(this.productos, 'Cod_Producto', 'Cod_Producto');
      },
      (err: HttpErrorResponse) => {
        this.openNotificacion(3, 'Error', 'No se pudo cargar los datos!');
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

  onSelectProducto(selected: CompleterItem): void {
    if (selected) {
      this.producto = selected.originalObject;
      console.log(this.producto);
      this.certificado.tipo_clasificacion_producto = this.producto.Tipo_Productos;
      this.lcf = [];
      this.laq = [];
      this.lcm = [];
      this.onLoadCaracteristicasForProducto(this.producto.Cod_Producto);
      /*this.UserModel.id_cargo = selected.originalObject['id'];
      */
    } else {
      console.log('Vacio');
    }
  }

  onSelectAnalista(selected: CompleterItem): void {
    if (selected) {
      this.analista = selected.originalObject;
      console.log(this.analista);
      this.certificado.codigo_analista = this.analista.codigo;
      /*this.UserModel.id_cargo = selected.originalObject['id'];
      */
    } else {
      console.log('Vacio');
    }
  }

  onLoadCaracteristicasForProducto(code) {
    this.servAsignacion.getCaracteristicasForProducto(code).subscribe(
      data => {
        this.resp =  data['body'];
        this.onOrganizationCaracteristicas();
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

  onOrganizationCaracteristicas() {
    console.log('Organizando caracteristicas: ');
    this.resp.forEach(element => {
      if (element['tipo_caracteristica'] == 'CF') {
        this.cf = new Caracteristicas();
        this.cf = element;
        this.lcf.push(this.cf);
      }else if (element['tipo_caracteristica'] == 'AQ') {
        this.aq = new Caracteristicas();
        this.aq = element;
        this.laq.push(this.aq);
      } else if (element['tipo_caracteristica'] == 'CM') {
        this.cm = new Caracteristicas();
        this.cm = element;
        this.lcm.push(this.cm);
      }
    });
    console.log('Imprimiendo Caracteristicas Fisicas');
    console.log(this.lcf);
    console.log('Imprimiendo Analisis Quimico');
    console.log(this.laq);
    console.log('Imprimiendo Control Microbiológico');
    console.log(this.lcm);
  }


  openLoading() {
    const loading = $('#loading');
    loading.fadeIn();
  }
  closeLoading() {
      const loading = $('#loading');
      loading.fadeOut();
  }
  openNotificacion(tipo: number, titulo: string, mensaje: string) {
    switch (tipo) {
      case 1:
        this.servNotification.success(
          titulo,
          mensaje,
          {
              timeOut: 2000,
              showProgressBar: true,
              pauseOnHover: false,
              clickToClose: false,
              maxLength: 10
          }
        );
      break;
      case 2:
        this.servNotification.alert(
          titulo,
          mensaje,
          {
              timeOut: 2000,
              showProgressBar: true,
              pauseOnHover: false,
              clickToClose: false,
              maxLength: 10
          }
        );
      break;
      case 3:
        this.servNotification.error(
          titulo,
          mensaje,
          {
              timeOut: 2000,
              showProgressBar: true,
              pauseOnHover: false,
              clickToClose: false,
              maxLength: 10
          }
        );
      break;
    }
  }
}
