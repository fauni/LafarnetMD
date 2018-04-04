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
import { forEach } from '@angular/router/src/utils/collection';
@Component({
    selector: 'app-veringreso',
    templateUrl: './veringreso.component.html',
    styleUrls: ['./veringreso.component.scss']
})
export class VeringresoComponent implements OnInit {
private searchStr: string;
 private dataService: CompleterData;
 public proveedores: Array <Proveedor>;
 public proveedor: Proveedor;
 public productos: Array <Productos>;
 public detalle: DetalleIngreso;
 public detallesIngreso: Array <DetalleIngreso>;
 public detalles: any[]= [];
 public ingresocabecera: Ingresos;
 public ingresos: Array <Ingresos>;
 // cabecera ingreso
public id_ingreso: string;
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
 public proveedorData: CompleterData;
 public productoData: CompleterData;

   constructor(public global: Globals, private servProductos: ProductosService,
    private completerService: CompleterService,
    private completerService2: CompleterService,
    private servProveedor: ProveedoresService,
    private servIngreso: IngresosService,
    private router: Router, private servDetalleIngreso: DetalleIngresosService, private route: ActivatedRoute) {
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
    this.route.params.subscribe(params => {


        this.id_ingreso = params['idi'];
        this.onLoadIngreso(this.id_ingreso);
       // this.onLoadProveedor(this.idproveedor);
        // this.descproveedor = this.getNombreprovPorCod(this.ingresocabecera.id_proveedor);
       // alert(this.ingresocabecera.id_proveedor);
    });
   }
   onLoadIngreso(idingreso) {
    // this.ingreso = new Ingresos();
      this.servIngreso.getIngreso(idingreso).subscribe(
      data => {
        this.ingresos = data.body;
       this.ingresos.forEach(ingresoitem => {
           this.ingresocabecera = ingresoitem;
       });
        this.id_ingreso = this.ingresocabecera.id_ingreso.toString() ;
        this.codingreso = this.ingresocabecera.codigo;
        this.fechaingreso = this.cambiaFormatofecha(this.ingresocabecera.fecha);
        this.idproveedor = this.ingresocabecera.id_proveedor;
        this.descproveedor = 'descripcion proveedor';
        this.glosaingreso = this.ingresocabecera.glosa;
        // alert (this.ingresocabecera.codigo);
        console.log ('INGRESO');
        console.log(this.ingresocabecera);
        // this.descproveedor = this.getNombreprovPorCod(this.idproveedor);
       // console.log(this.descproveedor);
        this.onLoadProveedor(this.idproveedor);
        this.onLoadProductos();
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
  onLoadProveedor(codprov) {
   this.servProveedor.getProveedor(codprov).subscribe(
     data => {
       this.proveedores = data.body;
       this.proveedores.forEach(itemprove => {
         this.proveedor = itemprove;
       });
       this.descproveedor = this.proveedor.Nombre_Proveedor;
       console.log('PROVEEDOR');
      console.log(this.proveedor);
      this.descproveedor = this.getNombreprovPorCod(this.idproveedor);
      // this.onLoadIngreso(this.id_ingreso);
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
   onLoadDetallesIngreso(codingreso) {
       this.servDetalleIngreso.getDetalleIngresosByCod(codingreso).subscribe(
        data => {
          this.detallesIngreso = data.body;
          this.detallesIngreso.forEach(detalleitem => {
            detalleitem.producto = this.getNombreprodPorCod (detalleitem.cod_producto) ;
        });
          // alert (this.ingresocabecera.codigo);
          console.log ('DETALLES DEL INGRESO');
          console.log(this.detallesIngreso);
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
        this.onLoadDetallesIngreso(this.codingreso);
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
   getNombreprovPorCod(cod_prov: string) {
        let nombre = '';
    this.proveedores.forEach(element => {
    if ( cod_prov == element.Cod_Proveedor)
    {
       nombre = element.Nombre_Proveedor;
    }
  });
  return nombre;
  }
  getNombreprodPorCod(cod_prod: string) {
    let nombre = '';
this.productos.forEach(element => {
if ( cod_prod == element.Cod_Producto )
{
   nombre = element.Nombre_Producto;
}
});
return nombre;
}
  cambiaFormatofecha(fecha: string) {
    const res = fecha.split('-');
    const fechasal = res[2] + '/' + res[1] + '/' + res[0];
   // console.log (fechasal);
    return fechasal;
  }
   // *************************************************************

}
