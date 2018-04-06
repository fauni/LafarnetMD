import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Globals } from '../../../globals';
import { Clasificacion } from '../clasificacion';
import { ClasificacionService } from '../clasificacion.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-asignacionparm',
  templateUrl: './asignacionparm.component.html',
  styleUrls: ['./asignacionparm.component.scss']
})
export class AsignacionparmComponent implements OnInit {

  constructor(public global: Globals, public servClasificaciones: ClasificacionService) { }
    public tipo_producto = 'MP'; // para el radio button, puede ser MP:materia prima o PT: producto terminado
    public clasificacion: Clasificacion;
    public clasificaciones: Array<Clasificacion>;
    public clasificacionesportipo: Array<Clasificacion>;
    public tipoClasificacionProducto = 'A'; // A o B o C.....F
  ngOnInit() {
    this.onLoadClasificaciones();
  }
  onLoadClasificaciones() {
   this.servClasificaciones.getProductosClasificacion().subscribe(
     data => {
       this.clasificaciones = data.body;
       this.onClicked(this.tipo_producto);
       // this.proveedorData = this.completerService.local(this.proveedores, 'Nombre_Proveedor', 'Nombre_Proveedor');
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
   onClicked(tipo) {
    this.filtrarportipo(tipo);
    this.asignatipo(tipo);
   }
   filtrarportipo(tipo)
   {  this.clasificacionesportipo = new Array<Clasificacion>();
      this.clasificaciones.forEach(element => {
          if (element.tipo == tipo) {
            this.clasificacionesportipo.push(element);
          }
      });
   }
  asignatipo(tipo) {
    this.tipo_producto =  tipo;
   // console.log(this.tipo_producto);
  }
}