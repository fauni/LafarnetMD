import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Globals } from '../../../../globals';
import { Productos, ProductosC } from '../../../datos/productos/productos';
import { ProductosService } from '../../../datos/productos/productos.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Clasificacion } from '../../clasificacion';
import { MzToastService } from '../../../../../../node_modules/ng2-materialize';

@Component({
  selector: 'app-listasignacionpt',
  templateUrl: './listasignacionpt.component.html',
  styleUrls: ['./listasignacionpt.component.scss']
})
export class ListasignacionptComponent implements OnInit {
  productos:  Array<Productos> = new Array<Productos>();
  newproductos: Array<ProductosC> = new Array<ProductosC>();
  clasificaciones: Array<Clasificacion>;
  clasificacion: any;

  filter: any;

  // Ordenacion
  key: string = 'Concentracion';
  reverse: boolean = false;
  p: number = 1;

  constructor(public global: Globals, public servProductos: ProductosService, private toast:MzToastService) {
  }

  ngOnInit() {
    this.openLoading();
    this.onLoadProductos();
    this.onLoadClasificacionPT();
  }

  onLoadProductos() {
    //this.productos = new Productos();
    this.servProductos.getProductosPT().subscribe(
      data => {
        this.productos = data.body;
        this.onLlenarNuevaListaProductos(this.productos);
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

  onLlenarNuevaListaProductos(lproductos: Array<Productos>){
    let producto: Productos = new Productos();
    lproductos.forEach(element => {
      let productoc: ProductosC = new ProductosC();
      productoc.Cod_Producto= element['Cod_Producto'];
      productoc.Nombre_Producto= element['Nombre_Producto'];
      productoc.Presentacion= element['Presentacion'];
      productoc.Principio_Activo= element['Principio_Activo'];
      productoc.Forma_Farmaceutica= element['Forma_Farmaceutica'];
      productoc.Concentracion= element['Concentracion'];
      productoc.Reg_Sanitario= element['Reg_Sanitario'];
      productoc.Peso_Nominal= element['Peso_Nominal'];
      productoc.Tipo_Productos= element['Tipo_Productos'];
      
      this.servProductos.verificaSiExiste(element['Cod_Producto']).subscribe(
        data => {
          console.log('Se verifico existencia de registro!');
          if(data['length'] == 0){
            productoc.Estado = '0';
          }else{
            productoc.Estado = '1';
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
          this.toast.show('No se pudo validar los productos! Error en el Servidor.', 3000, 'red');
        }
      );
      this.newproductos.push(productoc);
    });
    this.closeLoading();
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

 // Verifica si existe
  onEstaRegistrado(codigo: String): Number{
    var resp: Number = 0;
    this.servProductos.verificaSiExiste(codigo).subscribe(
      data => {
        console.log('Se verifico existencia de registro!');
        if(data['length'] == 0){
          resp = 0;
        }else{
          debugger;
          resp = 1;
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
        this.toast.show('No se pudo validar los productos! Error en el Servidor.', 3000, 'red');
        resp = 0;
      }
    );
    return resp;
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
