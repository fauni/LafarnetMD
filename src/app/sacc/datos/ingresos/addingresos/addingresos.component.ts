import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Globals } from '../../../../globals';
import {DetalleIngreso} from '../detalle_ingreso';
import {CompleterService, CompleterData} from 'ng2-completer';
import { CompleterItem } from 'ng2-completer/components/completer-item';
import { Completer } from 'readline';
import { Producto, Productos } from '../../productos/productos';
import { ProductosService } from '../../productos/productos.service';
import { Proveedor } from '../../proveedor/proveedor';
import { ProveedoresService } from '../../proveedor/proveedor.service';
import { Ingresos } from '../../ingresos/ingresos';
import { IngresosService } from '../../ingresos/ingresos.service';
import { HttpErrorResponse } from '@angular/common/http';
import { DetalleIngresosService } from '../detalleingresos.service';

@Component({
  selector: 'app-addingresos',
  templateUrl: './addingresos.component.html',
  styleUrls: ['./addingresos.component.scss']
})
export class AddingresosComponent implements OnInit {
 private searchStr: string;
 private dataService: CompleterData;
 public proveedores: Array <Proveedor>;
 public productos: Array <Productos>;
 public detalle: DetalleIngreso;
 public detallesIngreso: Array <DetalleIngreso>;
 public detalles: any[]= [];
 public ingresocabecera: Ingresos;
 // cabecera ingreso
 public codingreso: string;
 public fechaingreso: string;
 public idproveedor: string;
 public descproveedor: string;
 public glosaingreso: string;
 // detalle de ingreso
 public itemdetalle: number;
 public cantdet: string;
 public descprod: string;
 public codprodd: string;
 public loteprod: string;
 public fechavenprod: string;
 // otros
 // public respuestaaddingreso: any;
 // private completerService: CompleterService;
 public proveedorData: CompleterData;
 public productoData: CompleterData;
  constructor(public global: Globals, private servProductos: ProductosService,
              private completerService: CompleterService,
              private completerService2: CompleterService,
              private servProveedor: ProveedoresService,
              private servIngreso: IngresosService,
              private router: Router, private servDetalleIngreso: DetalleIngresosService) {
      this.itemdetalle = 0;
  }
  public options: Pickadate.DateOptions = {
    format: 'dd/mm/yyyy',
    formatSubmit: 'yyyy-mm-dd',
    today: 'HOY',
    closeOnSelect: true
  };
  public dateOfBirth = '2017-08-12'; // use formatSubmit format to set datepicker value

  ngOnInit() {
    this.onLoadProductos();
    this.onLoadProveedores();
  }
  onLoadProveedores() {
   /* this.proveedores = [{Cod_Proveedor: 'PRV001', Nombre_Proveedor: 'PRV001', Tipo: 'MUESTRA'},
                        {Cod_Proveedor: 'PRV002', Nombre_Proveedor: 'PRV002', Tipo: 'MARSING'},
                        {Cod_Proveedor: 'PRV003', Nombre_Proveedor: 'PRV003', Tipo: 'MAPRIAL S.R.L.'},
                        {Cod_Proveedor: 'PRV004', Nombre_Proveedor: 'PRV004', Tipo: 'COMSA S.A'},
                        {Cod_Proveedor: 'PRV005', Nombre_Proveedor: 'PRV005', Tipo: 'ALPHAR CHEMO CO. LIMITED'},
                        {Cod_Proveedor: 'PRV006', Nombre_Proveedor: 'PRV006', Tipo: 'PAL-HARMONY'} ];*/
  this.servProveedor.getProveedores().subscribe(
    data => {
      this.proveedores = data.body;
      this.proveedorData = this.completerService.local(this.proveedores, 'Nombre_Proveedor', 'Nombre_Proveedor');
     console.log(data);
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
  onLoadProductos() {
    // this.ingreso = new Ingresos();
      this.servProductos.getProductos().subscribe(
      data => {
        this.productos  = data.body;
        this.productoData = this.completerService.local(this.productos, 'Nombre_Producto', 'Nombre_Producto');
        // this.areas = data.body;
        console.log ('productos');
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
aadDetalle() {
 this.itemdetalle++;
 // alert(this.itemdetalle);
 this.codprodd = this.getCodprodPorNombre(this.descprod);
 this.detalle = new DetalleIngreso();
 this.detalle.id_detalle_ingreso = this.itemdetalle;
 this.detalle.cantidad = this.cantdet;
 this.detalle.lote = this.loteprod;
 this.detalle.fecha_vencimiento = this.fechavenprod;
 this.detalle.producto = this.descprod;
 this.detalle.cod_producto = this.getCodprodPorNombre(this.descprod);
 this.detalle.cod_ingreso = this.codingreso;
 this.detalle.usuario_creacion = localStorage.getItem('username');
 this.detalle.fecha_creacion = '0000-00-00';
 this.detalle.usuario_modificacion = localStorage.getItem('username');
 this.detalle.fecha_modificacion = '0000-00-00';
 // this.detalle = { id_detin: this.itemdetalle, id_ingreso: 1, id_producto: 2, cantidad: 1, lote: 'string', fecha_vencimiento: 'string'};
 this.detalles.push(this.detalle);
 console.log(this.detalles);
 this.cantdet = '0';
this.loteprod = '';
this.fechavenprod = '';
this.descprod = '';
}
guardaIngreso() {
    this.idproveedor = this.getIdprovPorNombre(this.descproveedor);
    // alert (this.codingreso + '-' + this.fechaingreso + '-' + this.idproveedor + '-' + this.glosaingreso);
    this.ingresocabecera = new Ingresos();
    this.ingresocabecera.codigo = this.codingreso;
    this.ingresocabecera.fecha = this.fechaingreso;
    this.ingresocabecera.id_proveedor = this.idproveedor;
    this.ingresocabecera.usuario_creacion = localStorage.getItem('username');
    this.ingresocabecera.fecha_creacion = '2018-04-01';
    this.ingresocabecera.usuario_modificacion = localStorage.getItem('username');
    this.ingresocabecera.fecha_modificacion = '2018-04-01';
    this.ingresocabecera.glosa = this.glosaingreso;
    // console.log(this.ingresocabecera);
    this.servIngreso.setIngresos(this.ingresocabecera).subscribe(
      data => {
      console.log(data);
      this.detalles.forEach(element => {
        this.guardaDetalleIngreso(element);
      });
      this.router.navigate(['/sacc/datos/ingresos/list']);
      // this.router.navigate(['/home']);
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
  guardaDetalleIngreso(detalle: DetalleIngreso) {
    this.servDetalleIngreso.setDetalleIngresos(detalle).subscribe(
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
    ) ;
  }
getIdprovPorNombre(proveedor: string) {
  let nombre: string = '';
  this.proveedores.forEach(element => {
  if ( proveedor == element.Nombre_Proveedor)
  {
      nombre = element.Cod_Proveedor;
  }
});
 return nombre;
}

getCodprodPorNombre(producto: string) {
  let codigo = '';
  this.productos.forEach(element => {
  if ( producto == element.Nombre_Producto )
   {
  codigo = element.Cod_Producto ;
   }
});
 return codigo;
}

  onSelectProveedor(selected: CompleterItem): void {
    if (selected) {
      console.log('seleccion');
      // alert(selected);
    } else {
      console.log('Vacio');
    }
  }
  onSelectProducto(selected: CompleterItem): void {
    if (selected) {
      console.log('seleccion');
      // alert(selected);
    } else {
      console.log('Vacio');
    }
  }
 }
