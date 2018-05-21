import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Globals } from '../../../../globals';
import { ProductosService } from '../productos.service';
import { Productos } from '../productos';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-listproductos',
  templateUrl: './listproductos.component.html',
  styleUrls: ['./listproductos.component.scss']
})
export class ListproductosComponent implements OnInit {
  productos:  Productos;
  filter: any;

  // Ordenacion
  key: string = 'Cod_Producto';
  reverse: boolean = false;
  p: number = 1;

  constructor(public global: Globals, public servProductos: ProductosService) { }

  ngOnInit() {
    this.onLoadProductos();
  }

  onLoadProductos() {
    this.productos = new Productos();
    this.servProductos.getProductos().subscribe(
      data => {
        this.productos = data.body;
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

  sort(key) {
    this.key = key;
    this.reverse = !this.reverse;
  }
}
