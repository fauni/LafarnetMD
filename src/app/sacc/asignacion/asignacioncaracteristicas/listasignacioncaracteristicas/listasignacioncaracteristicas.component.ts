import { Component, OnInit } from '@angular/core';
// import {Ingresos} from '../ingresos';
import { Router, ActivatedRoute } from '@angular/router';
import { Globals } from '../../../../globals';
// import { IngresosService } from '../ingresos.service';
import { HttpErrorResponse } from '@angular/common/http';
import { CaracteristicasService } from '../../caracteristicas.service';
import {Caracteristicasfisicas} from '../../caracteristicasfisicas';

@Component({
  selector: 'app-listasigcarac',
  templateUrl: './listasignacioncaracteristicas.component.html',
  styleUrls: ['./listasignacioncaracteristicas.component.scss']
})
export class ListAsignacionCaracteristicasComponent implements OnInit {
  public caracteristicasPT: Array <Caracteristicasfisicas>;
  public caracteristicasMP: Array <Caracteristicasfisicas>;
  constructor(public global: Globals, public servcaracteristicas: CaracteristicasService) { }
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
}
