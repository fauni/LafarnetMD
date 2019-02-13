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
import { CertificadosService } from '../../certificados.service';
import { CaracteristicasCertificado } from '../../caracteristicascertificado';
import { MzToastService } from 'ng2-materialize';
import { Lote } from '../../certificadospt/lote';
import { Proveedor, Fabricante } from '../../../datos/proveedor/proveedor';
import { ProveedoresService } from '../../../datos/proveedor/proveedor.service';

@Component({
  selector: 'app-addcertificadosmp',
  templateUrl: './addcertificadosmp.component.html',
  styleUrls: ['./addcertificadosmp.component.scss']
})
export class AddcertificadosmpComponent implements OnInit {
  numero_lote = '';
  // Button Switch
  labelOff = 'Resultados en Blanco';
  labelOn = 'Copiar Resultados';
  esCopia = false;

  // End Button Switch

  // Button Switch Tipo de Impresion de Certificado
  labelOffTC = 'Reimpresion';
  labelOnTC = 'Nuevo';
  reimpresion = true;

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

  // Variables de Caracteristicas definidas para el Certificado
  lccf: Array<CaracteristicasCertificado>;
  lcaq: Array<CaracteristicasCertificado>;
  lccm: Array<CaracteristicasCertificado>;

  ccf: CaracteristicasCertificado;
  caq: CaracteristicasCertificado;
  ccm: CaracteristicasCertificado;

  options: Pickadate.DateOptions = {
    clear: 'Borrar', // Clear button text
    close: 'Ok',    // Ok button text
    today: 'Hoy', // Today button text
    closeOnClear: true,
    closeOnSelect: false,
    format: 'yyyy-mm-dd',
    // formatSubmit: 'yyyy-mm-dd',
    // onClose: () => alert('Cerraste el picker.'),
    // onOpen: () => alert('abriste el picker.'),
    selectMonths: true, // Creates a dropdown to control month
    selectYears: 10,    // Creates a dropdown of 10 years to control year,
  };
  resp: any;

  // Lotes
  listalote: Array<Lote> = new Array<Lote>();

  // Proveedores
  proveedores: Array<Proveedor> = new Array<Proveedor>();

  // Fabricantes
  fabricantes: Array<Fabricante> = new Array<Fabricante>();

  constructor(
    private router: Router,
    private servAnalista: AnalistasService,
    private servProductos: ProductosService,
    private servProveedor: ProveedoresService,
    private servCertificados: CertificadosService,
    private servNotification: NotificationsService,
    public global: Globals,
    private completerService: CompleterService,
    private toast: MzToastService,
    private servAsignacion: AsignacionService) {
      this.certificado = new Certificados();
      this.certificado.tipo_impresion = 'nuevo';
      this.producto = new Productos();

      // Inicializamos lista de caracteristicas
      this.lcf = new  Array<Caracteristicas>();
      this.laq = new  Array<Caracteristicas>();
      this.lcm = new  Array<Caracteristicas>();
    }

  ngOnInit() {
    this.openLoading();
    this.loadDataDefault();
    this.onLoadAnalistas();
    this.onLoadProveedores();
    this.onLoadFabricantes();
    // this.onLoadProductos();
  }

  loadDataDefault() {
    // this.certificado.tipo_certificado = 'PT';
    this.certificado.usuario_creacion = localStorage.getItem('username');
    this.certificado.usuario_modificacion = localStorage.getItem('username');
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

  onLoadProveedores() {
    this.servProveedor.getProveedores().subscribe(
      data => {
        this.closeLoading();
        this.proveedores = data.body;
        console.log('Proveedores cargados correctamente! ---->');
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

  onLoadFabricantes() {
    this.servProveedor.getFabricantes().subscribe(
      data => {
        this.fabricantes = data.body;
        console.log('Fabricantes cargados correctamente! ---->');
      },
      (err: HttpErrorResponse) => {
        this.openNotificacion(3, 'Error', 'No se pudo cargar los Fabricantes!');
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
    this.servProductos.getProductosCompleter().subscribe(
      data => {
        this.closeLoading();
        this.productos = data.body;
        console.log('Productos cargados correctamente! ---->');
        this.productosData = this.completerService.local(this.productos, 'Reg_Sanitario', 'Reg_Sanitario');
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
    debugger;
    if (selected) {
      this.producto = selected.originalObject;
      console.log(this.producto);

      let nombreP: String = this.producto.Cod_Producto;

      this.certificado.tipo_clasificacion_producto = this.producto.Tipo_Productos;
      this.certificado.codigo_producto = this.producto.Cod_Producto;
      this.certificado.concentracion = this.producto.Concentracion;
      this.certificado.forma_farmaceutica = this.producto.Forma_Farmaceutica;
      this.certificado.nombre_producto = this.producto.Nombre_Producto;
      if (nombreP.substr(0, 2) == 'PT') {
        this.certificado.tipo_certificado = 'Producto Terminado';
      }else if (nombreP.substr(0, 2) == 'MP') {
        this.certificado.tipo_certificado = 'Materia Prima';
      } else {
        this.certificado.tipo_certificado = '';
      }
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
      } else if (element['tipo_caracteristica'] == 'AQ') {
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
    this.lccf = this.changeCC(this.lcf);
    console.log(this.lccf);

    console.log('Imprimiendo Analisis Quimico');
    this.lcaq = this.changeCC(this.laq);
    console.log(this.lcaq);

    console.log('Imprimiendo Control Microbiológico');
    this.lccm = this.changeCC(this.lcm);
    console.log(this.lccm);
  }

  changeCC(lc: Array<Caracteristicas>): Array<CaracteristicasCertificado> {
    let lista: Array<CaracteristicasCertificado> = new Array<CaracteristicasCertificado>();
    lc.forEach(element => {
      let c: CaracteristicasCertificado = new CaracteristicasCertificado();
      c.codigo_certificado = '';
      c.codigo_producto = element.codigo;
      c.id_caracteristica = element.id_caracteristica;
      c.descripcion = element.descripcion;
      c.especificacion = element.especificacion;
      c.resultado = '';
      c.tipo_caracteristica = element.tipo_caracteristica;
      c.estado = element.estado;
      c.orden = element.orden;
      lista.push(c);
    });
    return lista;
  }

  copiarResultados() {
    // alert(this.esCopia);
    if (this.esCopia) {
      this.copiarEspecificacionAResultado();
    }else {
      this.limpiarResultados();
    }
    this.cambiarTipoImpresionCertificado();
  }

  cambiarTipoImpresionCertificado() {
    // alert('Cambiando');
    // console.log(this.certificado);
    if (this.reimpresion) {
      this.certificado.tipo_impresion = 'reimpresion';
    } else {
      this.certificado.tipo_impresion = 'nuevo';
    }
  }

  copiarEspecificacionAResultado(): void {
    this.lccf.forEach(element => {
      element.resultado = element.especificacion;
    });
    this.lcaq.forEach(element => {
      element.resultado = element.especificacion;
    });
    this.lccm.forEach(element => {
      element.resultado = element.especificacion;
    });
  }

  limpiarResultados(): void {
    this.lccf.forEach(element => {
      element.resultado = '';
    });
    this.lcaq.forEach(element => {
      element.resultado = '';
    });
    this.lccm.forEach(element => {
      element.resultado = '';
    });
  }

  guardarCertificado(): void {
    // console.log(this.certificado);
    this.servCertificados.setCertificadosMP(this.certificado).subscribe(
      data => {
        if (data.status == 200) {
          // Guardando las caracteristicas del certificado
          let codcertificado: string = data.body['codigo_certificado'];

          this.onGuardarCaracteristicasCertificacion(codcertificado, this.lccf);
          this.onGuardarCaracteristicasCertificacion(codcertificado, this.lcaq);
          this.onGuardarCaracteristicasCertificacion(codcertificado, this.lccm);

          this.openNotificacion(1, 'Correcto!', 'Se guardo correctamente');
          this.router.navigate(['/sacc/certificados/mp']);
        }else {
          this.openNotificacion(3, 'No se guardo', 'Intente nuevamente!');
        }
      }, (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          // A client-side or network error occurred. Handle it accordingly.
          console.log('Ocurrio un error:', err.error.message);
        } else {
          // The backend returned an unsuccessful response code.
          // The response body may contain clues as to what went wrong,
          console.log(`El servidor respondio: ${err.status}, body was: ${err.error}`);
        }
        this.openNotificacion(3, 'Ocurrio un error', 'Comuniquese con el Administrador');
      }
    );
  }

  onGuardarCaracteristicasCertificacion(codigocertificado: string, lista: Array<CaracteristicasCertificado>) {
    debugger;
    lista.forEach(element => {
      let cc: CaracteristicasCertificado = new CaracteristicasCertificado();
      cc = element;
      cc.codigo_certificado = codigocertificado;
      this.onGuardarUnaSolaCaracteristica(cc);
    });
  }

  onGuardarUnaSolaCaracteristica(c: CaracteristicasCertificado) {
    c.usuario_creacion = localStorage.getItem('username');
    c.usuario_modificacion = localStorage.getItem('username');
    this.servCertificados.saveCertificadoCaracteristica(c).subscribe(
      data => {
        debugger;
        if (data.status == 200) {
          console.log('Guardando...');
          console.log(this.certificado);
        }else {
          this.openNotificacion(3, 'No se guardo', 'Intente nuevamente!');
        }
      }, (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          // A client-side or network error occurred. Handle it accordingly.
          console.log('Ocurrio un error:', err.error.message);
        } else {
          // The backend returned an unsuccessful response code.
          // The response body may contain clues as to what went wrong,
          console.log(`El servidor respondio: ${err.status}, body was: ${err.error}`);
        }
        this.openNotificacion(3, 'Ocurrio un error', 'Comuniquese con el Administrador');
      }
    );
  }

  onLoadCertificado() {
    this.certificado = new Certificados();
    this.servCertificados.getCertificadoPorLote(this.numero_lote).subscribe(data => {
      console.log('Se cargo correctamente este certificado');
      // console.log(data);
      this.certificado = data['body'][0];
      console.log(this.certificado);
      this.onLoadCFCertificado(this.certificado.codigo_certificado);
    }, (err: HttpErrorResponse) => {
      if (err.error instanceof Error) {
        console.log('Ocurrio un error:', err.error.message);
      } else {
        // The backend returned an unsuccessful response code.
        // The response body may contain clues as to what went wrong,
        console.log(`El servidor respondio: ${err.status}, body was: ${err.error}`);
      }
    });
  }


  onLoadCFCertificado(codigo_certificado: String) {
    this.servCertificados.getCFCertificado(codigo_certificado).subscribe(data => {
      console.log('Se cargo correctamente Lista Caracteristicas Fisicas');
      // console.log(data);
      this.lccf = data['body'];
      console.log(this.lccf);
      this.onLoadAQCertificado(codigo_certificado);
    }, (err: HttpErrorResponse) => {
      if (err.error instanceof Error) {
        console.log('Ocurrio un error:', err.error.message);
      } else {
        // The backend returned an unsuccessful response code.
        // The response body may contain clues as to what went wrong,
        console.log(`El servidor respondio: ${err.status}, body was: ${err.error}`);
      }
    });
  }

  onLoadAQCertificado(codigo_certificado: String) {
    this.servCertificados.getAQCertificado(codigo_certificado).subscribe(data => {
      console.log('Se cargo correctamente Lista Analisis Quimico');
      // console.log(data);
      this.lcaq = data['body'];
      console.log(this.lcaq);
      this.onLoadCMCertificado(codigo_certificado);
    }, (err: HttpErrorResponse) => {
      if (err.error instanceof Error) {
        console.log('Ocurrio un error:', err.error.message);
      } else {
        // The backend returned an unsuccessful response code.
        // The response body may contain clues as to what went wrong,
        console.log(`El servidor respondio: ${err.status}, body was: ${err.error}`);
      }
    });
  }

  onLoadCMCertificado(codigo_certificado: String) {
    this.servCertificados.getCMCertificado(codigo_certificado).subscribe(data => {
      console.log('Se cargo correctamente Lista Control Microbiologico');
      // console.log(data);
      this.lccm = data['body'];
      console.log(this.lccm);
    }, (err: HttpErrorResponse) => {
      if (err.error instanceof Error) {
        console.log('Ocurrio un error:', err.error.message);
      } else {
        // The backend returned an unsuccessful response code.
        // The response body may contain clues as to what went wrong,
        console.log(`El servidor respondio: ${err.status}, body was: ${err.error}`);
      }
    });
  }

  getLote(event: any) {
    if (event.keyCode == 13) {
      let n_lote = this.certificado.lote.split('/').join('|');
      this.onLoadLoteMP(n_lote);
    }
  }

  onLoadLoteMP(nlote: String) {
    let l: Lote = new Lote();
    this.servCertificados.getLoteMP(nlote).subscribe(data => {
      console.log('Datos de Lote extraidos');
      console.log(data);
      this.listalote = data['body'];
      this.listalote.forEach(element => {
        l = element;
      });
      this.certificado.codigo_certificado = this.onGeneraCodigoCertificado();
      this.certificado.codigo_producto = l.ItemCode;
      this.certificado.nombre_producto = l.ItemName;
      this.certificado.fecha_fabricacion = l.PrdDate;
      this.certificado.fecha_vencimiento = l.ExpDate;
      this.certificado.concentracion = ''; // l.Concentracion;
      this.certificado.forma_farmaceutica = ''; // l.FormaFarmaceutica;
      this.certificado.protocolo = l.BatchNum;
      this.certificado.tipo_clasificacion_producto = l.Tipo_Productos;

      if (this.certificado.codigo_producto.substr(0, 2) == 'PT') {
        this.certificado.tipo_certificado = 'Producto Terminado';
      }else if (this.certificado.codigo_producto.substr(0, 2) == 'MP') {
        this.certificado.tipo_certificado = 'Materia Prima';
      } else {
        this.certificado.tipo_certificado = '';
      }

      this.lcf = [];
      this.laq = [];
      this.lcm = [];
      this.onLoadCaracteristicasForProducto(l.ItemCode);

    }, (err: HttpErrorResponse) => {
      this.toast.show('Ocurrio un error no se trajo información del Lote', 2000, 'red round');
      if (err.error instanceof Error) {
        console.log('Ocurrio un error:', err.error.message);
      } else {
        // The backend returned an unsuccessful response code.
        // The response body may contain clues as to what went wrong,
        console.log(`El servidor respondio: ${err.status}, body was: ${err.error}`);
      }
    });
  }

  onGeneraCodigoCertificado(): string {
    let cod: string = '';
    let f = new Date();
    cod = this.certificado.lote + '-' +
    f.getDate() + '' + f.getMonth() + '' + f.getFullYear() + '' + f.getHours() + '' + f.getMinutes() + '' + f.getSeconds();
    return cod;
  }

  guardarFabricante() {
    let nombre_fabricante = prompt('Introduzca el nombre del Fabricante:', ' ');
    let f: Fabricante = new Fabricante();
    f.id_fabricante = '0';
    f.nombre_fabricante = nombre_fabricante;
    f.usuario_creacion = localStorage.getItem('username');
    f.usuario_modificacion = localStorage.getItem('username');
    this.servProveedor.saveFabricante(f).subscribe(data => {
      console.log('Se agrego el Fabricante Correctamente!');
      this.toast.show('Se agrego el Fabricante Correctamente!', 3000);
      this.onLoadFabricantes();
    }, (err: HttpErrorResponse) => {
      this.toast.show('Ocurrio un error al guardar!', 3000, 'red');
      if (err.error instanceof Error) {
        console.log('Ocurrio un error:', err.error.message);
      } else {
        // The backend returned an unsuccessful response code.
        // The response body may contain clues as to what went wrong,
        console.log(`El servidor respondio: ${err.status}, body was: ${err.error}`);
      }
    });
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
