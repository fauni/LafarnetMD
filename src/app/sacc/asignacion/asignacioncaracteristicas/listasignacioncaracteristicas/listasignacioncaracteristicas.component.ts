import { Component, OnInit } from '@angular/core';
// import {Ingresos} from '../ingresos';
import { Router, ActivatedRoute } from '@angular/router';
import { Globals } from '../../../../globals';
// import { IngresosService } from '../ingresos.service';
import { HttpErrorResponse } from '@angular/common/http';
import { CaracteristicasService } from '../../caracteristicas.service';
import {Caracteristicasfisicas} from '../../caracteristicasfisicas';
import { NotificationsService } from 'angular2-notifications';

@Component({
  selector: 'app-listasigcarac',
  templateUrl: './listasignacioncaracteristicas.component.html',
  styleUrls: ['./listasignacioncaracteristicas.component.scss']
})
export class ListAsignacionCaracteristicasComponent implements OnInit {
  public caracteristicas: Caracteristicasfisicas;
  public descripcionPT: string ;
  public descripcionMP: string ;
  public tipoclasPT: string; // control fisico analisis quimico o control microbiologico
  public tipoclasMP: string; // control fisico  o control microbiologico
  // public tipo: number;
  // public estado: number;
  public caracteristica: Caracteristicasfisicas;
  public caracteristicasPT: Array <Caracteristicasfisicas>;
  public caracteristicasMP: Array <Caracteristicasfisicas>;
  constructor(public global: Globals,
              public servcaracteristicas: CaracteristicasService,
              private servNotification: NotificationsService) { }
  ngOnInit() {
    this.onLoadCaracteristicasPT();
    this.onLoadCaracteristicasMP();
  }
  onLoadCaracteristicasMP() {
    this.servcaracteristicas.getCaracteristicasMP().subscribe(
      data => {
       this.caracteristicasMP = data.body;
         // console.log(this.clasificacionesCaracteristicas);
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
    onLoadCaracteristicasPT() {
      this.servcaracteristicas.getCaracteristicasPT().subscribe(
        data => {
         this.caracteristicasPT = data.body;
           // console.log(this.clasificacionesCaracteristicas);
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
      guardaNuevaCaracteristicaPT() {
        this.caracteristica = new Caracteristicasfisicas();
        this.caracteristica.id_caracteristicas_fisicas = '0';
        this.caracteristica.descripcion = this.descripcionPT;
        this.caracteristica.estado = '1';
        this.caracteristica.tipo = '2';
        this.caracteristica.esp_car = this.tipoclasPT;
        this.caracteristica.usuario_creacion = localStorage.getItem('username');
        this.caracteristica.fecha_creacion = '0000-00-00';
        this.caracteristica.usuario_modificacion = localStorage.getItem('username');
        this.caracteristica.fecha_modificacion = '0000-00-00';
        console.log(this.caracteristica);
        this.servcaracteristicas.addCaracteristica(this.caracteristica).subscribe(data => {
          console.log(data);
          this.caracteristicasPT.push(data.body);
          this.openNotificacion(1, 'Éxito' , 'El registro se guardó con éxito');
        },
          (err: HttpErrorResponse) => {
            if (err.error instanceof Error) {
              this.openNotificacion(3, 'Error' , 'No se pudo insertar el registro');
              console.log('Ocurrio un error:', err.error.message);
            } else {
              this.openNotificacion(3, 'Error' , 'No se pudo insertar el registro ' + err.status);
              console.log(`El servidor respondio: ${err.status}, body was: ${err.error}`);
            }
          }
        ) ;
        // console.log(this.caracteristica);
      }
      guardaNuevaCaracteristicaMP() {
        this.caracteristica = new Caracteristicasfisicas();
        this.caracteristica.id_caracteristicas_fisicas = '0';
        this.caracteristica.descripcion = this.descripcionMP;
        this.caracteristica.estado = '1';
        this.caracteristica.tipo = '1';
        this.caracteristica.esp_car = this.tipoclasMP;
        this.caracteristica.usuario_creacion = localStorage.getItem('username');
        this.caracteristica.fecha_creacion = '0000-00-00';
        this.caracteristica.usuario_modificacion = localStorage.getItem('username');
        this.caracteristica.fecha_modificacion = '0000-00-00';
        console.log(this.caracteristica);
        this.servcaracteristicas.addCaracteristica(this.caracteristica).subscribe(data => {
          console.log(data);
          this.caracteristicasPT.push(data.body);
          this.openNotificacion(1, 'Éxito' , 'El registro se guardó con éxito');
          },
          (err: HttpErrorResponse) => {
            if (err.error instanceof Error) {
              this.openNotificacion(3, 'Error' , 'No se pudo insertar el registro');
              console.log('Ocurrio un error:', err.error.message);
            } else {
              this.openNotificacion(3, 'Error' , 'No se pudo insertar el registro ' + err.status);
              console.log(`El servidor respondio: ${err.status}, body was: ${err.error}`);
            }
          }
        ) ;
        // console.log(this.caracteristica);
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
      esInvalidoMP() {
        if (this.descripcionMP  && this.tipoclasMP ) {
          return false;
        } else {
          return true;
        }
      }
      esInvalidoPT() {
        if (this.descripcionPT  && this.tipoclasPT ) {
          return false;
        } else {
          return true;
        }
      }
}
