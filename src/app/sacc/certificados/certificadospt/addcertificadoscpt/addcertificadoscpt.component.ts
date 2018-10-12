import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Globals } from '../../../../globals';
import { MzToastService } from 'ng2-materialize';
import { Certificados } from '../../certificados';
import { CaracteristicasCertificado } from '../../caracteristicascertificado';
import { HttpErrorResponse } from '@angular/common/http';
import { CertificadosnService } from '../../certificadosn.service';
import { Analista } from '../../../datos/analista/analista';
import { Proveedor } from '../../../datos/proveedor/proveedor';
import { CompleterData, CompleterService, CompleterItem } from 'ng2-completer';
import { AnalistasService } from '../../../datos/analista/analista.service';
import { ProveedoresService } from '../../../datos/proveedor/proveedor.service';
import { CertificadosService } from '../../certificados.service';

@Component({
  selector: 'app-addcertificadoscpt',
  templateUrl: './addcertificadoscpt.component.html',
  styleUrls: ['./addcertificadoscpt.component.scss']
})
export class AddcertificadoscptComponent implements OnInit {
  analistas: Array<Analista>;
  analista: Analista;
  analistaData: CompleterData;
  
  codigo_certificado: string = '';


  certificado: Certificados = new Certificados();
  
  // Listas de Características del Certificado
  lcf: Array<CaracteristicasCertificado> = new Array<CaracteristicasCertificado>();
  laq: Array<CaracteristicasCertificado> = new Array<CaracteristicasCertificado>();
  lcm: Array<CaracteristicasCertificado> = new Array<CaracteristicasCertificado>();

  // End Button Switch

  // Button Switch Tipo de Impresion de Certificado
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

  // Proveedores
  proveedores: Array<Proveedor> = new Array<Proveedor>();

  constructor(private _route: ActivatedRoute, 
    private router: Router, 
    private toast: MzToastService,
    private servCertificados: CertificadosnService,
    private servAnalista: AnalistasService,
    private servProveedor: ProveedoresService,
    private completerService: CompleterService, 
    private servCertificadosM: CertificadosService) {

  }

  ngOnInit() {
    this.codigo_certificado = this._route.snapshot.paramMap.get('id').replace('/', '|');
    this.loadDataDefault();
    this.onLoadAnalistas();
    this.onLoadProveedores();
    this.onLoadCertificado(this.codigo_certificado);
  }

  loadDataDefault() {
    // this.certificado.tipo_certificado = 'PT';
    this.certificado.usuario_creacion = localStorage.getItem('username');
    this.certificado.usuario_modificacion = localStorage.getItem('username');
  }

  onLoadCertificado(codigo_certificado: String){
    //alert(codigo_certificado);
    this.servCertificados.getCertificadoAnalisisMP(codigo_certificado).subscribe(data => {
      // this.toast.show('Se trajo los datos del certificado correctamente', 500);    
      this.certificado.id_certificado_analisis = data['body'].id_certificado_analisis;
      //this.certificado.codigo_certificado = data['body'].codigo_certificado;
      this.certificado.codigo_analista = data['body'].codigo_analista;
      this.certificado.protocolo = data['body'].protocolo;
      this.certificado.fecha_analisis = data['body'].fecha_analisis.substring(0, 10);
      this.certificado.lote = data['body'].lote;
      this.certificado.fecha_fabricacion = data['body'].fecha_fabricacion.substring(0, 10);
      this.certificado.fecha_vencimiento = data['body'].fecha_vencimiento.substring(0, 10);
      this.certificado.cantidad_fabricada = data['body'].cantidad_fabricada;
      this.certificado.cantidad_liberada = data['body'].cantidad_liberada;
      this.certificado.tipo_certificado = data['body'].tipo_certificado;
      this.certificado.tipo_clasificacion_producto = data['body'].tipo_clasificacion_producto;
      this.certificado.codigo_producto = data['body'].codigo_producto;
      this.certificado.dictamen = data['body'].dictamen;
      this.certificado.observaciones = data['body'].observaciones;
      this.certificado.tipo_impresion = data['body'].tipo_impresion;
      this.certificado.nombre_producto = data['body'].nombre_producto;
      this.certificado.concentracion = data['body'].concentracion;
      this.certificado.forma_farmaceutica = data['body'].forma_farmaceutica;
      this.certificado.nombre_proveedor = data['body'].nombre_proveedor;
      this.certificado.presentacion = data['body'].presentacion;
      this.certificado.conservacionyalm = data['body'].conservacionyalm;
      this.certificado.referencias = data['body'].referencias;
      this.certificado.codigo_certificado = this.onGeneraCodigoCertificado(this.certificado);
      this.onLoadCaracteristicasCertificado(codigo_certificado);
    }, (err: HttpErrorResponse) => {
      if (err.error instanceof Error) {
        console.log('Ocurrio un error:', err.error.message);
        
      } else {
        // The backend returned an unsuccessful response code.
        // The response body may contain clues as to what went wrong,
        console.log(`El servidor respondio: ${err.status}, body was: ${err.error}`);
      }
      this.toast.show('Ocurrio un error: ' + err.error.message, 500);      
    });
  }

  onLoadCaracteristicasCertificado(codigo_certificado: String){
    this.servCertificados.getCaracteristicasCertificado(codigo_certificado).subscribe(data => {
      this.toast.show('Se trajo las caracteristicas de los certificados correctamente', 500);
      this.onClasificarCaracteristicasCertificado(data['body']);
    }, (err: HttpErrorResponse) => {
      if (err.error instanceof Error) {
        console.log('Ocurrio un error:', err.error.message);
      } else {
        // The backend returned an unsuccessful response code.
        // The response body may contain clues as to what went wrong,
        console.log(`El servidor respondio: ${err.status}, body was: ${err.error}`);
      }
      this.toast.show('Ocurrio un error: ' + err.error.message, 500);      
    });
  }

  onClasificarCaracteristicasCertificado(lcaracteristicas: Array<CaracteristicasCertificado>) {
    lcaracteristicas.forEach(element => {
      let car: CaracteristicasCertificado = new CaracteristicasCertificado();
      car = element;
      if(car.tipo_caracteristica =="CF"){
        this.lcf.push(car);
      }else if(car.tipo_caracteristica =="CM") {
        this.lcm.push(car);
      } else {
        this.laq.push(car);
      }
      console.log(car);
    });
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

  onLoadProveedores() {
    this.servProveedor.getProveedores().subscribe(
      data => {
        this.proveedores = data.body;
        console.log('Proveedores cargados correctamente! ---->');
      },
      (err: HttpErrorResponse) => {
        this.toast.show('No se pueden cargar los proveedores', 2000);
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

  onGeneraCodigoCertificado(c: Certificados): string {
    let cod: string = '';
    let f = new Date();
    cod = c.lote + '-' +
    f.getDate() + '' + f.getMonth() + '' + f.getFullYear() + '' + f.getHours() + '' + f.getMinutes() + '' + f.getSeconds();
    return cod;
  }

  guardarCertificado(): void {
    // console.log(this.certificado);
    this.servCertificadosM.setCertificadosMP(this.certificado).subscribe(
      data => {
        if (data.status == 200) {
          // Guardando las caracteristicas del certificado
          let codcertificado: string = data.body['codigo_certificado'];

          this.onGuardarCaracteristicasCertificacion(codcertificado, this.lcf);
          this.onGuardarCaracteristicasCertificacion(codcertificado, this.lcm);
          this.onGuardarCaracteristicasCertificacion(codcertificado, this.laq);

          this.toast.show('Correcto!, Se guardo correctamente', 3000, 'green');
          this.router.navigate(['/sacc/certificados/pt']);
        }else {
          this.toast.show('No se guardo Intente nuevamente!', 3000, 'red');
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
        this.toast.show('Ocurrio un error, Comuniquese con el Administrador', 3000, 'red');
      }
    );
  }

  onGuardarCaracteristicasCertificacion(codigocertificado: string, lista: Array<CaracteristicasCertificado>) {
    lista.forEach(element => {
      let cc: CaracteristicasCertificado = new CaracteristicasCertificado();
      cc = element;
      cc.codigo_certificado = codigocertificado;
      this.onGuardarUnaSolaCaracteristica(cc);
    });
  }

  onGuardarUnaSolaCaracteristica(c: CaracteristicasCertificado) {
    c.codigo_certificado = this.certificado.codigo_certificado;
    c.usuario_creacion = localStorage.getItem('username');
    c.usuario_modificacion = localStorage.getItem('username');
    this.servCertificados.saveCaracteristicaCertificado(c).subscribe(
      data => {
        if (data.status == 200) {
          console.log('Guardando...');
        }else {
          this.toast.show('No se guardo Intente nuevamente!', 3000, 'red');
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
        this.toast.show('Ocurrio un error Comuniquese con el Administrador', 3000, 'red');
      }
    );
  }
}
