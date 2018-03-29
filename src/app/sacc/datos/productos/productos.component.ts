import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Globals } from '../../../globals';
import { Productos } from './productos';
import { ProductosService } from './productos.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.scss']
})
export class ProductosComponent implements OnInit {
  productos: Productos;
  constructor(public global: Globals, private servProducto: ProductosService ) { }

  ngOnInit() {
    this.onLoadProductos();
  }

  onLoadProductos() {
    this.productos = new Productos();
      this.servProducto.getProductos().subscribe(
      data => {
        //this.areas = data.body;
        console.log(this.productos);
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
