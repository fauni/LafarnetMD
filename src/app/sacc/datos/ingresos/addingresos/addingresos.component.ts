import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Globals } from '../../../../globals';
import {Proveedor} from '../../../proveedor';
import {DetalleIngreso} from '../../../detalle_ingreso';
import {CompleterService, CompleterData} from 'ng2-completer';
import { CompleterItem } from 'ng2-completer/components/completer-item';
import { Completer } from 'readline';
import { Producto } from '../../productos/productos';
import { ProductosService } from '../../productos/productos.service';
import { HttpErrorResponse } from '@angular/common/http';
@Component({
  selector: 'app-addingresos',
  templateUrl: './addingresos.component.html',
  styleUrls: ['./addingresos.component.scss']
})
export class AddingresosComponent implements OnInit {

  private searchStr: string;
  private dataService: CompleterData;
 public proveedores: Array <Proveedor>;
 public productos: Array <Producto>;
 public detalle: DetalleIngreso;
 public detallesIngreso: Array <DetalleIngreso>;
 public detalles: any[]= [];
 // detalle de ingreso
 public itemdetalle: number;
 public cantdet: number;
 public descprod: string;
 public loteprod: string;
 public fechavenprod: string;
 // private completerService: CompleterService;
 public proveedorData: CompleterData;
 public productoData: CompleterData;
  constructor(public global: Globals, private servProductos: ProductosService,
              private completerService: CompleterService, private completerService2: CompleterService) {
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
    this.proveedores = [{id_proveedor: 1, cod_proveedor: 'PRV001', desc_proveedor: 'MUESTRA'},
                        {id_proveedor: 2, cod_proveedor: 'PRV002', desc_proveedor: 'MARSING'},
                        {id_proveedor: 3, cod_proveedor: 'PRV003', desc_proveedor: 'MAPRIAL S.R.L.'},
                        {id_proveedor: 4, cod_proveedor: 'PRV004', desc_proveedor: 'COMSA S.A'},
                        {id_proveedor: 5, cod_proveedor: 'PRV005', desc_proveedor: 'ALPHAR CHEMO CO. LIMITED'},
                        {id_proveedor: 6, cod_proveedor: 'PRV006', desc_proveedor: 'PAL-HARMONY'} ];
  this.proveedorData = this.completerService.local(this.proveedores, 'desc_proveedor', 'desc_proveedor');
  }
  onLoadProductos() {
    // this.ingreso = new Ingresos();
      this.servProductos.getProductos().subscribe(
      data => {
        this.productos  = data.body;
        this.productoData = this.completerService.local(this.productos, 'Nombre_Producto', 'Nombre_Producto');
        //this.areas = data.body;
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
aadDetalle() {
 this.itemdetalle++;
 alert(this.itemdetalle);
 this.detalle = new DetalleIngreso();
 this.detalle.id_detin = this.itemdetalle;
 this.detalle.cantidad = this.cantdet;
 this.detalle.lote = this.loteprod;
 this.detalle.fecha_vencimiento = this.fechavenprod;
 this.detalle.producto = this.descprod;
 //this.detalle = { id_detin: this.itemdetalle, id_ingreso: 1, id_producto: 2, cantidad: 1, lote: 'string', fecha_vencimiento: 'string'};
 this.detalles.push(this.detalle);
 //console.log(this.detalles);
  //alert('this.detallesIngreso');
}
  onSelectProveedor(selected: CompleterItem): void {
    if (selected) {
      console.log('seleccion');
      //alert(selected);
    } else {
      console.log('Vacio');
    }
  }
  onSelectProducto(selected: CompleterItem): void {
    if (selected) {
      console.log('seleccion');
      //alert(selected);
    } else {
      console.log('Vacio');
    }
  }
 }
