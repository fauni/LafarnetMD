import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Globals } from '../../../../globals';
import { HttpErrorResponse } from '@angular/common/http/src/response';
import { AsignacionService } from '../../asignacion.service';
import { Clasificacion } from '../../clasificacion';
import { Caracteristicasfisicas } from '../../caracteristicasfisicas';
import { Analisisquimico } from '../../analisisquimico';
import { Controlmicrobiologico } from '../../controlmicrobiologico';
import { Caracteristicas } from '../../caracteristicas';
import { element } from 'protractor';
import { CaracteristicasService } from '../../caracteristicas.service';
import { NotificationsService } from 'angular2-notifications';
import { Productos, ProductosC } from '../../../datos/productos/productos';
import { ProductosService } from '../../../datos/productos/productos.service';
import { MzToastService } from '../../../../../../node_modules/ng2-materialize';


@Component({
  selector: 'app-detailasignacionmp',
  templateUrl: './detailasignacionmp.component.html',
  styleUrls: ['./detailasignacionmp.component.scss']
})
export class DetailasignacionmpComponent implements OnInit {
  nombre_producto: string;
  clasificacion_producto: string;
  codigo_producto: string;
  show: Boolean = false;

  resp: any;

  lcf: Array<Caracteristicas>;
  laq: Array<Caracteristicas>;
  lcm: Array<Caracteristicas>;

  cf: Caracteristicas;
  aq: Caracteristicas;
  cm: Caracteristicas;


  // Variables de recuperación para lista Maestras
  listainicialCF: Array<Caracteristicas> = new Array<Caracteristicas>();
  listainicialAQ: Array<Caracteristicas> = new Array<Caracteristicas>();
  listainicialCM: Array<Caracteristicas> = new Array<Caracteristicas>();

 // Variables Caracteristicas de Producto Terminado
  caracteristicasPT: Array<Caracteristicasfisicas>;

  lcfPT: Array<Caracteristicasfisicas>;
  laqPT: Array<Caracteristicasfisicas>;
  lcmPT: Array<Caracteristicasfisicas>;

  cfPT:  Caracteristicasfisicas;
  aqPT:  Caracteristicasfisicas;
  cmPT:  Caracteristicasfisicas;

  //#region  Variables Lista de Productos
  productos:  Array<Productos> = new Array<Productos>();
  newproductos: Array<ProductosC> = new Array<ProductosC>();
  clasificaciones: Array<Clasificacion>;
  clasificacion: any;

  filter: any;

  // Ordenacion
  key: string = 'Concentracion';
  reverse: boolean = false;
  p: number = 1;
  //#endregion
  
  //#region VARIABLES ASIGNACIÓN MASIVA
  lcodigoproducto: Array<String> = new Array<String>();
  //#endregion

  constructor(
    public global: Globals,
    private route: ActivatedRoute,
    private router: Router,
    private servAsignacion: AsignacionService,
    private servCaracteristicas: CaracteristicasService,
    private servNotification: NotificationsService,
    public servProductos: ProductosService, 
    private toast:MzToastService
  ) {
    this.lcf = new  Array<Caracteristicas>();
    this.laq = new  Array<Caracteristicas>();
    this.lcm = new  Array<Caracteristicas>();

    // Caracteristicas de Producto Terminado
    this.caracteristicasPT = new Array<Caracteristicasfisicas>();
    this.lcfPT = Array<Caracteristicasfisicas>();
    this.laqPT = Array<Caracteristicasfisicas>();
    this.lcmPT = Array<Caracteristicasfisicas>();
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
        this.clasificacion_producto = params['id'].toString();
        this.nombre_producto = params['code'].toString();
        this.onVerificaEspecificacion(this.nombre_producto);
        // alert('Estoy entrando');
        this.openNotificacion(1, 'Correcto!', 'Se cargaron correctamente los datos');
    });
  }

  onLlenarNuevaListaProductos(lproductos: Array<Productos>){
    let producto: Productos = new Productos();
    this.openLoading();
    lproductos.forEach(element => {
      let productoc: ProductosC = new ProductosC();
      productoc.Cod_Producto= element['Cod_Producto'];
      productoc.Nombre_Producto= element['Nombre_Producto'];
      productoc.Presentacion= element['Presentacion'];
      productoc.Principio_Activo= element['Principio_Activo'];
      productoc.Forma_Farmaceutica= element['Forma_Farmaceutica'];
      productoc.Concentracion= element['Concentracion'];
      productoc.Reg_Sanitario= element['Reg_Sanitario'];
      productoc.Peso_Nominal= element['Peso_Nominal'];
      productoc.Tipo_Productos= element['Tipo_Productos'];
      
      this.servProductos.verificaSiExiste(element['Cod_Producto']).subscribe(
        data => {
          console.log('Se verifico existencia de registro!');
          if(data['length'] == 0){
            productoc.Estado = '0';
          }else{
            productoc.Estado = '1';
          }
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
          this.toast.show('No se pudo validar los productos! Error en el Servidor.', 3000, 'red');
        }
      );
      this.newproductos.push(productoc);
    });
    this.closeLoading();
  }
// End Lista de Productos
  onVerificaEspecificacion(code) {
    this.codigo_producto = code;
    this.servAsignacion.getCaracteristicasForProducto(code).subscribe(
      data => {
        console.log(data['length']);
        if (data['length'] > 0) {
          this.show = true;
          this.onLoadCaracteristicasForProducto(this.nombre_producto);
        } else {
          this.show = false;
          this.onLoadClasificacion(this.clasificacion_producto);
        }
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

  onLoadCaracteristicasForClasificacion(code) {
    this.servAsignacion.getCaracteristicasForClasificacion(code).subscribe(
      data => {
        console.log('Clasificacion: ');
        console.log(data);
        this.resp =  data['body'];
        this.onOrganizationCaracteristicas('CL');
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

  onLoadCaracteristicasForProducto(code) {
    this.servAsignacion.getCaracteristicasForProducto(code).subscribe(
      data => {
        console.log('Producto: ');
        console.log(data);
        this.resp =  data['body'];
        this.onOrganizationCaracteristicas('PR');
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

  onLoadClasificacion(code) {
    debugger;
    this.servAsignacion.getClasificacionmp(code).subscribe(
      data => {
        console.log('Clasificacion Name: ');
        console.log(data['body'][0]['descripcion']);

        // console.log('Imprimimos la class' + clas);
        this.onLoadCaracteristicasForClasificacion(data['body'][0]['descripcion']);
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

  onOrganizationCaracteristicas(tipo: String) {
    console.log('Organizando caracteristicas: --->');
    console.log(this.resp);
    this.resp.forEach(element => {
      console.log('----------------> Nuevo Elemento');
      console.log(element);
      this.guardaSiEsClasificacion(element, tipo);
      if (element['tipo_caracteristica'] == 'CF') {
        this.cf = new Caracteristicas();
        this.cf = element;
        //this.cf.estado = '5';
        this.lcf.push(this.cf);
      }else if (element['tipo_caracteristica'] == 'AQ') {
        this.aq = new Caracteristicas();
        this.aq = element;
        //this.aq.estado = '5';
        this.laq.push(this.aq);
      } else if (element['tipo_caracteristica'] == 'CM') {
        this.cm = new Caracteristicas();
        this.cm = element;
        //this.cm.estado = '5';
        this.lcm.push(this.cm);
      }
    });

    this.onLoadCaracteristicas();
    console.log('Imprimiendo Caracteristicas Fisicas');
    console.log(this.lcf);
    console.log('Imprimiendo Analisis Quimico');
    console.log(this.laq);
    console.log('Imprimiendo Control Microbiológico');
    console.log(this.lcm);

    // Recuperamos valores Inciales
    this.listainicialCF = this.lcf;
    this.listainicialAQ = this.laq;
    this.listainicialCM = this.lcm;
  }

  openLoading() {
      const loading = $('#loading');
      loading.fadeIn();
  }
  closeLoading() {
      const loading = $('#loading');
      loading.fadeOut();
  }
// Este metodo guarda los elementos cuando no se tiene caracteristicas asignadas al producto
  guardaSiEsClasificacion(e: Caracteristicas, tipo: String): void { // Se guarda los valores por defecto al clasificar
    e.codigo_producto = this.codigo_producto;
    e.usuario_creacion = localStorage.getItem('username');
    e.fecha_creacion = '';
    e.usuario_modificacion = localStorage.getItem('username');
    e.fecha_modificacion = '';
    if (tipo == 'CL') {
      this.servAsignacion.saveAsignacion(e).subscribe(
        data => {
          console.log('Se asigno ' + e);
        },
        (err: HttpErrorResponse) => {
          if (err.error instanceof Error) {
            console.log('Ocurrio un error:', err.error.message);
          } else {
            console.log(`El servidor respondio: ${err.status}, body was: ${err.error}`);
          }
        }
      );
    }
  }

  //// Verifica si existe en caso de no existir la caracteristica en la BD lo guarda en otro caso lo modifica
  guardaSiNoExisteCaracteristica(e: Caracteristicas): void {
    e.codigo_producto = this.codigo_producto;
    e.usuario_creacion = localStorage.getItem('username');
    e.fecha_creacion = '';
    e.usuario_modificacion = localStorage.getItem('username');
    e.fecha_modificacion = '';

    this.servAsignacion.existe(e).subscribe(
      data => {
        console.log('EL ELemento E o no E');
        console.log(data);
        if (data['body'] == 'true') {
          console.log('Modificar');
          e.estado = '1';
          e.usuario_modificacion = localStorage.getItem('username');
          this.modificarEstadoCaracteristica(e);
        } else {
          console.log('Guardar');
          this.guardarCaracteristica(e);
        }
      },
      (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          console.log('Ocurrio un error:', err.error.message);
        } else {
          console.log(`El servidor respondio: ${err.status}, body was: ${err.error}`);
        }
      }
    );
  }

  // Guarda los valores de la especificación de caracteristicas asignadas
  guardarAsignacionCaracteristicaProducto() {
    this.lcf.forEach(element => {
      this.modificarCaracteristica(element);
    });
    this.laq.forEach(element => {
      this.modificarCaracteristica(element);
    });
    this.lcm.forEach(element => {
      this.modificarCaracteristica(element);
    });
    this.toast.show('Se realizo la asignación Correctamente!', 3000, 'green', () => this.router.navigate(['/sacc/asignacion/mp/listadd', this.codigo_producto]));
  }

  // Como ya existen datos guardados modifica los valores de la especificación que se encuentran vacias
  modificarCaracteristica(e: Caracteristicas) {
    console.log('Modificando .... .... ....');
    console.log(e);
    e.usuario_modificacion = localStorage.getItem('username');
    this.servAsignacion.modificarAsignacion(e).subscribe(
      data => {
        console.log('Se modifico correctamente!');
      },
      (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          console.log('Ocurrio un error:', err.error.message);
        } else {
          console.log(`El servidor respondio: ${err.status}, body was: ${err.error}`);
        }
      }
    );
  }
  // Guardando cualquier caracterstica en la base de datos
  guardarCaracteristica(c: Caracteristicas) {
    // console.log('Guardando');
    c.codigo_producto = this.codigo_producto;
    c.usuario_creacion = localStorage.getItem('username');
    c.fecha_creacion = '';
    c.usuario_modificacion = localStorage.getItem('username');
    c.fecha_modificacion = '';
    c.estado = '1';  // Para que la caracteristica se encuentre activa

    console.log(c);

    this.servAsignacion.saveAsignacion(c).subscribe(
      data => {
        console.log(data);
      },
      (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          console.log('Ocurrio un error:', err.error.message);
        } else {
          console.log(`El servidor respondio: ${err.status}, body was: ${err.error}`);
        }
      }
    );
  }

  // Obtiene Caracteristicas de Producto Terminado
  onLoadCaracteristicas() {
    this.servCaracteristicas.getCaracteristicasMP().subscribe(
        data => {
          this.caracteristicasPT = data.body;
          console.log('caracteristicas Materia Prima');
          console.log(this.caracteristicasPT);
          this.clasificarCaracteristicasPT();
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

  clasificarCaracteristicasPT(): void {
    debugger;
    this.cfPT = new Caracteristicasfisicas();
    this.aqPT = new Caracteristicasfisicas();
    this.cmPT = new Caracteristicasfisicas();
    this.caracteristicasPT.forEach(element => {
      if (element['esp_car'] == 'CF') {
        this.cfPT = element;
        if (this.isExist(this.cfPT, this.lcf)) {
          this.cfPT.checkeado = true;
        }else {
          this.cfPT.checkeado = false;
        }
        this.lcfPT.push(this.cfPT);
      }else if (element['esp_car'] == 'AQ') {
        this.aqPT = element;
        if (this.isExist(this.aqPT, this.laq)) {
          this.aqPT.checkeado = true;
        }else {
          this.aqPT.checkeado = false;
        }
        this.laqPT.push(this.aqPT);
      } else if (element['esp_car'] == 'CM') {
        this.cmPT = element;
        if (this.isExist(this.cmPT, this.lcm)) {
          this.cmPT.checkeado = true;
        }else {
          this.cmPT.checkeado = false;
        }
        this.lcmPT.push(this.cmPT);
      }
    });
    // Caracteristicas Producto Terminado clasificadas por tipo
    console.log('-------------------> CLasificando productos terminados');
    console.log(this.lcfPT);
    console.log(this.laqPT);
    console.log(this.lcmPT);
  }

  isExist(elemento: Caracteristicasfisicas, lista: Array<Caracteristicas>) {
    let sw: Boolean = false;
    lista.forEach(element => {
      if (elemento.id_caracteristicas_fisicas == element.id_caracteristica) {
        sw = true;
      }
    });
    return sw;
  }

  agregaElementoLista (elemento: Caracteristicasfisicas, lista: Array<Caracteristicas>): Array<Caracteristicas> {
    let e: Caracteristicas = new Caracteristicas();
    e.codigo = this.codigo_producto;
    e.codigo_producto = this.codigo_producto;
    e.descripcion = elemento.descripcion;
    e.especificacion = '';
    e.estado = elemento.estado;
    e.id_caracteristica = elemento.id_caracteristicas_fisicas;
    e.tipo_caracteristica = elemento.esp_car;
    e.usuario_creacion = elemento.usuario_creacion;
    e.usuario_modificacion = elemento.usuario_creacion;
    e.fecha_creacion = elemento.fecha_creacion;
    e.fecha_modificacion = elemento.fecha_modificacion;

    //this.guardaSiEsClasificacion(e, 'CL');
    this.guardaSiNoExisteCaracteristica(e);
    lista.push(e);
    return lista;
  }

  eliminaElementoLista(elemento: Caracteristicasfisicas, lista: Array<Caracteristicas>): Array<Caracteristicas> {
    let laux: Array<Caracteristicas> = new Array<Caracteristicas>();
    let e: Caracteristicas = new Caracteristicas();

    e.codigo = this.codigo_producto;
    e.codigo_producto = this.codigo_producto;
    e.descripcion = elemento.descripcion;
    e.especificacion = '';
    e.estado = elemento.estado;
    e.id_caracteristica = elemento.id_caracteristicas_fisicas;
    e.tipo_caracteristica = elemento.esp_car;
    e.usuario_creacion = elemento.usuario_creacion;
    e.usuario_modificacion = elemento.usuario_creacion;
    e.fecha_creacion = elemento.fecha_creacion;
    e.fecha_modificacion = elemento.fecha_modificacion;

    lista.forEach(element => {
      if (e.id_caracteristica != element.id_caracteristica) {
        laux.push(element);
      } else {
        e.estado = '2';
        e.usuario_modificacion = localStorage.getItem('username');
        this.modificarEstadoCaracteristica(e);
      }
    });

    lista = laux;
    return lista;
  }

  modificarEstadoCaracteristica(e: Caracteristicas) {
    this.servAsignacion.updateEstadoAsignacion(e).subscribe(
      data => {
        console.log('Modificado estado característica');
        console.log(data);
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

  // Cambia los estados de todos los productos con el valor enviado esto sirve para volver a los pasos iniciales
  modificarAllEstadoCaracteristicaPorProducto(e: Caracteristicas) {
    this.servAsignacion.modificarTodosLosEstadosPorProducto(e).subscribe(
      data => {
        console.log('Se cambio el estado del producto en la base de datos');
        console.log(data);
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

  cambiatipocheck(check: string) {
    if (check == '0') {
      return false;
    } else {
     return true;
    }
  }

  cambiaEstadoAddOrRemove(itm: Caracteristicasfisicas) {
    console.log(this.lcfPT);
    itm.checkeado = !itm.checkeado;
    if (itm.checkeado) {
      console.log('Si --->');
      console.log(itm);
      switch (itm.esp_car) {
        case 'CF':
          this.agregaElementoLista(itm, this.lcf);
        break;
        case 'AQ':
          this.agregaElementoLista(itm, this.laq);
        break;
        case 'CM':
          this.agregaElementoLista(itm, this.lcm);
        break;
      }
    }else {
      console.log('No --->');
      console.log(itm);
      switch (itm.esp_car) {
        case 'CF':
          let listaAuxiliarCF: Array<Caracteristicas> = new Array<Caracteristicas>();
          listaAuxiliarCF = this.eliminaElementoLista(itm, this.lcf);
          console.log('Lista Auxiliar CF --->');
          console.log(listaAuxiliarCF);
          this.lcf = [];
          this.lcf = listaAuxiliarCF;
        break;
        case 'AQ':
          let listaAuxiliarAQ: Array<Caracteristicas> = new Array<Caracteristicas>();
          listaAuxiliarAQ = this.eliminaElementoLista(itm, this.laq);
          console.log('Lista Auxiliar AQ --->');
          console.log(listaAuxiliarAQ);
          this.laq = [];
          this.laq = listaAuxiliarAQ;
        break;
        case 'CM':
          let listaAuxiliarCM: Array<Caracteristicas> = new Array<Caracteristicas>();
          listaAuxiliarCM = this.eliminaElementoLista(itm, this.lcm);
          console.log('Lista Auxiliar CM --->');
          console.log(listaAuxiliarCM);
          this.lcm = [];
          this.lcm = listaAuxiliarCM;
        break;
      }
    }
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
