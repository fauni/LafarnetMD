import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Globals } from '../../../globals';
import { Clasificacion } from '../clasificacion';
import { ClasificacionService } from '../clasificacion.service';
import { ClasificacionCaracteristica } from './clasisficacion_caracteristica';
import { ClasificacionCaracteristicaCFAQCM } from './clasificacioncaracteristicaCFAQCM';
import { ClasificacionCaracteristicaService} from './clasificacion_caracteristica.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-asignacionparm',
  templateUrl: './asignacionparm.component.html',
  styleUrls: ['./asignacionparm.component.scss']
})
export class AsignacionparmComponent implements OnInit {

  constructor(public global: Globals, public servClasificaciones: ClasificacionService,
             public servClasificacionCaracteristica: ClasificacionCaracteristicaService) { }
    public tipo_producto = '1'; // para el radio button, puede ser 1 = MP:materia prima o 2 = PT: producto terminado
    public clasificacion: Clasificacion;
    public clasificaciones: Array<Clasificacion>;
    public clasificacionesportipo: Array<Clasificacion>;
    public clasificacionescaracteristicas: Array<ClasificacionCaracteristica>;
    public clasificacioncaracteristicaCFAQCM: ClasificacionCaracteristicaCFAQCM;
    public clasificacionescaracteristicasCFAQCM: Array<ClasificacionCaracteristicaCFAQCM>;
    public tipoClasificacionProducto = 'A'; // A o B o C.....F
  ngOnInit() {
    this.onLoadClasificaciones();
    // this.onLoadClasificacionesCaracteristicasCFAQCM();
  }
  onLoadClasificaciones() {
   this.servClasificaciones.getProductosClasificacion().subscribe(
     data => {
      this.clasificaciones = data.body;
      this.onClicked(this.tipo_producto);
      this.onLoadClasificacionesCaracteristicasCFAQCM();
       console.log(this.clasificaciones);
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
   onLoadClasificacionesCaracteristicas(idtipo: string) {
    this.servClasificacionCaracteristica.getClasificacionCaracteristicaBytipoclas(idtipo).subscribe(
      data => {
        this.clasificacionescaracteristicas = data.body;
       console.log('clasificaciones caracteristicas');
        console.log(this.clasificacionescaracteristicas);
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
    onLoadClasificacionesCaracteristicasCFAQCM() {
      this.servClasificacionCaracteristica.getClasificacionCaracteristicaCFAQCM().subscribe(
        data => {
          this.clasificacionescaracteristicasCFAQCM = data.body;
          console.log('clasificaciones caracteristicas con CF AQ CM');
          console.log(this.clasificacionescaracteristicasCFAQCM);
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
   onClicked(tipo) {
    this.filtrarportipo(tipo);
    this.asignatipo(tipo);
   }
   filtrarportipo(tipo) {
     let tipolit: string;
     if (tipo == '1') {
      tipolit = 'MP';
     }else {
      tipolit = 'PT';
     }
      this.clasificacionesportipo = new Array<Clasificacion>();
      this.clasificaciones.forEach(element => {
          if (element.tipo == tipolit) {
            this.clasificacionesportipo.push(element);
          }
      });
   }
  asignatipo(tipo) {
    this.tipo_producto =  tipo;
   // console.log(this.tipo_producto);
  }
}
