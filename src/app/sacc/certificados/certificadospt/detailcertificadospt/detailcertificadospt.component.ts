import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Globals } from '../../../../globals';
import { SafeUrl } from '@angular/platform-browser';
import { HttpErrorResponse } from '@angular/common/http';
import { CertificadosService } from '../../certificados.service';
import { CertificadosnService } from '../../certificadosn.service';
import { MzToastService } from 'ng2-materialize';
import { CaracteristicasCertificado } from '../../caracteristicascertificado';
import { Certificados } from '../../certificados';
import { ConfirmationService } from '@jaspero/ng2-confirmations';
import { ResolveEmit } from '@jaspero/ng2-confirmations/src/interfaces/resolve-emit';


@Component({
  selector: 'app-detailcertificadospt',
  templateUrl: './detailcertificadospt.component.html',
  styleUrls: ['./detailcertificadospt.component.scss']
})

export class DetailcertificadosptComponent implements OnInit {

  imgSafe: SafeUrl; // Imagen del Reporte Logo Lafar
  codigo_certificado: String = '';
  
  //OBtenemos información del certificado 
  certificado: Certificados = new Certificados();
  
  // Listas de Características del Certificado
  lcf: Array<CaracteristicasCertificado> = new Array<CaracteristicasCertificado>();
  laq: Array<CaracteristicasCertificado> = new Array<CaracteristicasCertificado>();
  lcm: Array<CaracteristicasCertificado> = new Array<CaracteristicasCertificado>();

  constructor(public global: Globals, 
    private servCertificados: CertificadosnService, 
    private _route: ActivatedRoute, 
    private route: Router,
    private toast: MzToastService) {
    
  }

  ngOnInit() {
    this.codigo_certificado = this._route.snapshot.paramMap.get('id').replace('|', '/');
    this.onLoadCertificado(this.codigo_certificado.replace('/', '|'));
  }

  onLoadCertificado(codigo_certificado: String){
    //alert(codigo_certificado);
    this.servCertificados.getCertificadoAnalisisMP(codigo_certificado).subscribe(data => {
      // this.toast.show('Se trajo los datos del certificado correctamente', 500);    
      this.certificado.id_certificado_analisis = data['body'].id_certificado_analisis;
      this.certificado.codigo_certificado = data['body'].codigo_certificado;
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
      }else if(car.tipo_caracteristica =="CM"){
        this.lcm.push(car);
      }else{
        this.laq.push(car);
      }
      console.log(car);
    });
  }

  export(cc: String){
    this.servCertificados.getCertificadoPTPDF(cc.replace('/', '|')).subscribe(data => {
      console.log(data);

      let blob = new Blob([data], {type: 'application/pdf'});
      let fileURL = URL.createObjectURL(blob);
      window.open(fileURL);

      //var pdfAsDataUri = "data:application/pdf;base64,"+data;
      //window.open(pdfAsDataUri);
      
      /*var file = new Blob([data], {type: 'application/pdf'});
      */
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

  onAnularCertificado(){
    let codcer: string = this.codigo_certificado.replace('/', '|');
    this.servCertificados.anularCertificado(codcer).subscribe(data => {
      this.toast.show(data['message'], 300);
      if(window.confirm('Desea utilizar la información de este certificado en uno nuevo?')){
        this.route.navigate(['/sacc/certificados/pt/addcpt/'+ codcer]);
      }else{
        this.route.navigate(['/sacc/certificados/pt/list/']);
      }
    }, (err: HttpErrorResponse) => {
      if (err.error instanceof Error) {
        console.log('Ocurrio un error:', err.error.message);
      } else {
        // The backend returned an unsuccessful response code.
        // The response body may contain clues as to what went wrong,
        console.log(`El servidor respondio: ${err.status}, body was: ${err.error}`);
      }
      this.toast.show('Ocurrio un error: Intente nuevamente!' + err.error.message, 500);      
    });
  }
}

