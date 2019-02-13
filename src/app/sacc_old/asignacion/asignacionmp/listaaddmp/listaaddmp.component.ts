import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Globals } from '../../../../globals';
import { Productos, ProductosC } from '../../../datos/productos/productos';
import { ProductosService } from '../../../datos/productos/productos.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Clasificacion } from '../../clasificacion';
import { MzToastService } from '../../../../../../node_modules/ng2-materialize';
import { AsignacionService } from '../../asignacion.service';
import { Especificacion } from '../../especificacion';

@Component({
  selector: 'app-listaaddmp',
  templateUrl: './listaaddmp.component.html',
  styleUrls: ['./listaaddmp.component.scss']
})
export class ListaaddmpComponent implements OnInit {
  productos:  Array<Productos> = new Array<Productos>();
  newproductos: Array<ProductosC> = new Array<ProductosC>();
  clasificaciones: Array<Clasificacion>;
  clasificacion: any;
  filter: any;

  // Ordenacion
  key: string = 'Concentracion';
  reverse: boolean = false;
  p: number = 1;

  //#region VARIABLES ASIGNACIÓN MASIVA
  especificacion: Especificacion = new Especificacion();
  lespecificacion: Array<Especificacion> = new Array<Especificacion>();
  codigo_producto:String;
  lcodigoproducto: Array<String> = new Array<String>();

  btndisabled:Boolean = false;
  //#endregion

  constructor(
    public global: Globals, 
    public servProductos: ProductosService, 
    public servAsignacion: AsignacionService,
    private toast:MzToastService,
    private _route:ActivatedRoute,
    private route: Router
  ) {
      this.codigo_producto = _route.snapshot.paramMap.get('code');
  }

  ngOnInit() {
    this.openLoading();
    this.onLoadProductos();
    this.onLoadClasificacionPT();
    this.onLoadEspecificacion(this.codigo_producto);
  }

  onLoadProductos() {
    //this.productos = new Productos();
    this.servProductos.getProductosMP().subscribe(
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

  //#region FUNCIONES PARA SELECCIONAR PRODUCTOS RELACIONADOS
  
  agregarLProductos(val, prod) {
    if(val.target.checked){
      this.adicionarCodigoLista(prod.Cod_Producto);
    }else {
      this.quitarCodigoLista(prod.Cod_Producto);
    }
    console.log(this.lcodigoproducto);
  }
  adicionarCodigoLista(codigo: String){
    this.lcodigoproducto.push(codigo);
  }
  quitarCodigoLista(codigo: String){
    let laux: Array<String>= new Array<String>();
    this.lcodigoproducto.forEach(element => {
      if(element != codigo){
        laux.push(element);
      }
    });
    this.lcodigoproducto = laux;
  }

  cambiaEstadoCheck(estado:number): Boolean{
    if(estado == 0){
      return false;
    } else {
      return true;
    }
  }

  onLoadEspecificacion(code) {
    this.servAsignacion.getEspecificacion(code).subscribe(
      data => {
        this.lespecificacion = data['body'];
        console.log(this.lespecificacion);
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
        this.toast.show('Ocurrio un error al cargar la especificacion del producto', 3000, 'green');
      }
    );
  }

  guardarEspecificacionProductos(){
    this.btndisabled = true;
    if(this.lcodigoproducto.length <= 0){
      this.toast.show('No seleccionó ningún producto!', 3000, 'red', () => { this.route.navigate(['/sacc/asignacion/mp/']); });
    } else {
      this.lcodigoproducto.forEach(element => {
        let p: Especificacion = new Especificacion();
        this.lespecificacion.forEach(prod => {
          p = prod;
          p.codigo_producto = element.toString();
          this.onSaveEspecificacionProducto(p);
        });
      });
      this.toast.show('Se guardo los datos adicionales correctamente!', 3000, 'green', () => { this.route.navigate(['/sacc/asignacion/mp/']); });
    }
  }

  onSaveEspecificacionProducto(p: Especificacion){
    this.servAsignacion.saveEspecificacion(p).subscribe(
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
  //#endregion
}
