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


@Component({
  selector: 'app-detailasignacionpt',
  templateUrl: './detailasignacionpt.component.html',
  styleUrls: ['./detailasignacionpt.component.scss']
})
export class DetailasignacionptComponent implements OnInit {
  nombre_producto: string;
  clasificacion_producto: string;
  codigo_producto: string;
  show: boolean = false;

  resp: any;

  lcf: Array<Caracteristicas>;
  laq: Array<Caracteristicas>;
  lcm: Array<Caracteristicas>;

  caracteristicasFisicas: Caracteristicas;
  analisisquimico: Caracteristicas;
  controlmicrobiologico: Caracteristicas;

  constructor(
    public global: Globals,
    private route: ActivatedRoute,
    private servAsignacion: AsignacionService
  ) {
    this.lcf = new  Array<Caracteristicas>();
    this.laq = new  Array<Caracteristicas>();
    this.lcm = new  Array<Caracteristicas>();
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
        this.clasificacion_producto = params['id'].toString();
        this.nombre_producto = params['code'].toString();
        this.onVerificaEspecificacion(this.nombre_producto);
    });
  }

  onVerificaEspecificacion(code) {
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

  onLoadCaracteristicasForProducto(code) {
    this.servAsignacion.getCaracteristicasForProducto(code).subscribe(
      data => {
        console.log('Producto: ');
        console.log(data);
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

  onLoadClasificacion(code) {
    this.servAsignacion.getClasificacion(code).subscribe(
      data => {
        console.log('Clasificacion Name: ');
        console.log(data['body'][0]['descripcion']);

        //console.log('Imprimimos la class' + clas);
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

  onOrganizationCaracteristicas() {
    console.log('Organizando caracteristicas: ');
    this.resp.forEach(element => {
      if (element['tipo_caracteristica'] == 'CF') {
        this.caracteristicasFisicas = new Caracteristicas();
        this.caracteristicasFisicas = element;
        this.lcf.push(this.caracteristicasFisicas);
      }else if (element['tipo_caracteristica'] == 'AQ') {
        this.analisisquimico = new Caracteristicas();
        this.analisisquimico = element;
        this.laq.push(this.analisisquimico);
      } else if (element['tipo_caracteristica'] == 'CM') {
        this.controlmicrobiologico = new Caracteristicas();
        this.controlmicrobiologico = element;
        this.lcm.push(this.controlmicrobiologico);
      }
    });
    console.log('Imprimiendo Caracteristicas Fisicas');
    console.log(this.lcf);
    console.log('Imprimiendo Analisis Quimico');
    console.log(this.laq);
    console.log('Imprimiendo Control Microbiológico');
    console.log(this.lcm);
  }
}
