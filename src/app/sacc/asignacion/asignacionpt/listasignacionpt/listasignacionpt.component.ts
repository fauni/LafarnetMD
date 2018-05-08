import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Globals } from '../../../../globals';
import { Productos } from '../../../datos/productos/productos';
import { ProductosService } from '../../../datos/productos/productos.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Clasificacion } from '../../clasificacion';

@Component({
  selector: 'app-listasignacionpt',
  templateUrl: './listasignacionpt.component.html',
  styleUrls: ['./listasignacionpt.component.scss']
})
export class ListasignacionptComponent implements OnInit {
  productos:  any;
  clasificaciones: Array<Clasificacion>;
  clasificacion: any;

  filter: any;

  // Ordenacion
  key: string = 'Cod_Producto';
  reverse: boolean = false;
  p: number = 1;

  constructor(public global: Globals, public servProductos: ProductosService) {
  }

  ngOnInit() {
    this.openLoading();
    this.onLoadProductos();
    this.onLoadClasificacionPT();
  }

  onLoadProductos() {
    //this.productos = new Productos();
    this.servProductos.getProductos().subscribe(
      data => {
        this.productos = data.body;
        this.closeLoading();
        console.log('Productos cargados correctamente!');
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

  onLoadClasificacionPT() {
    this.servProductos.getClasificacionPT().subscribe(
      data => {
        this.clasificaciones = data.body;
        console.log('Clasificación cargados correctamente!');
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

  onChangeClasificacion() {
    console.log(this.clasificacion);
    this.filter = this.clasificacion;
  }

  sort(key) {
    this.key = key;
    this.reverse = !this.reverse;
  }

  openLoading() {
    const loading = $('#loading');
    loading.fadeIn();
  }
  closeLoading() {
      const loading = $('#loading');
      loading.fadeOut();
  }
}
