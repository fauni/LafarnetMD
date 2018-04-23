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

  cf: Caracteristicas;
  aq: Caracteristicas;
  cm: Caracteristicas;

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
    console.log('Organizando caracteristicas: --->');
    console.log(this.resp);
    this.resp.forEach(element => {
      console.log('----------------> Nuevo Elemento');
      console.log(element);
      if (element['tipo_caracteristica'] == 'CF') {
        this.cf = new Caracteristicas();
        this.cf = element;
        this.cf.estado = '5';
        this.lcf.push(this.cf);
      }else if (element['tipo_caracteristica'] == 'AQ') {
        this.aq = new Caracteristicas();
        this.aq = element;
        this.aq.estado = '5';
        this.laq.push(this.aq);
      } else if (element['tipo_caracteristica'] == 'CM') {
        this.cm = new Caracteristicas();
        this.cm = element;
        this.cm.estado = '5';
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

  guardarAsignacionProductoPR() {
    // console.log('Guardar por Clasificacion');
    this.lcf.forEach(element => {
        this.guardarElemento(element, 'PR');
    });
    this.laq.forEach(element => {
      this.guardarElemento(element, 'PR');
    });
    this.lcm.forEach(element => {
      this.guardarElemento(element, 'PR');
    });
  }

  guardarAsignacionProductoCL() {
    // console.log('Guardar por Clasificacion');
    this.lcf.forEach(element => {
        this.guardarElemento(element, 'CL');
    });
    this.laq.forEach(element => {
      this.guardarElemento(element, 'CL');
    });
    this.lcm.forEach(element => {
      this.guardarElemento(element, 'CL');
    });
  }

  // Guardando caracteristica por caracteristica
  guardarElemento(c: Caracteristicas, tipo: string) {
    // console.log('Guardando');
    c.codigo_producto = this.codigo_producto;
    c.usuario_creacion = localStorage.getItem('username');
    c.fecha_creacion = '';
    c.usuario_modificacion = localStorage.getItem('username');
    c.fecha_modificacion = '';
    console.log(c);
    if (tipo == 'CL') {
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
    }else {
      if (c.estado == '5') {
        console.log('Modificar');
        /*this.servAsignacion.saveAsignacion(c).subscribe(
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
        );*/
      }else {
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
    }
  }
}
