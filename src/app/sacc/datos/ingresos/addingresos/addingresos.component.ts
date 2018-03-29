import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Globals } from '../../../../globals';
import {Proveedor} from '../../../proveedor';
import {DetalleIngreso} from '../../../detalle_ingreso';
import {CompleterService, CompleterData} from 'ng2-completer';
import { CompleterItem } from 'ng2-completer/components/completer-item';
import { Completer } from 'readline';
import { Producto } from '../../productos/productos';
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
 public itemdetalle: number;
 // private completerService: CompleterService;
 public proveedorData: CompleterData;
 public productoData: CompleterData;
  constructor(public global: Globals, private completerService: CompleterService, private completerService2: CompleterService) {
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
  this.productos = [
  {id_producto: 1, cod_producto: '110100', desc_producto: 'ACETANILIDA', presentacion: 'POLVO', principio_activo: '', forma_farmaceutica: '', concentracion: '', reg_sanitario: '', peso_nominal: 0.0, id_tipo_producto: 2},
  {id_producto: 2, cod_producto: '110101', desc_producto: 'ACETAMINOFENO', presentacion: 'POLVO', principio_activo: '', forma_farmaceutica: '', concentracion: '', reg_sanitario: '', peso_nominal: 0.0, id_tipo_producto: 2},
  {id_producto: 3, cod_producto: '110102', desc_producto: 'ACETATO DE DL-ALFATOCOFEROL', presentacion: 'POLVO', principio_activo: '', forma_farmaceutica: '', concentracion: '', reg_sanitario: '', peso_nominal: 0.0, id_tipo_producto: 2},
  {id_producto: 4, cod_producto: '110103', desc_producto: 'AEROSIL 200', presentacion: 'POLVO', principio_activo: '', forma_farmaceutica: '', concentracion: '', reg_sanitario: '', peso_nominal: 0.0, id_tipo_producto: 2},
  {id_producto: 5, cod_producto: '110104', desc_producto: 'ALFAMETILDOPA (METILDOPA)', presentacion: 'POLVO', principio_activo: '', forma_farmaceutica: '', concentracion: '', reg_sanitario: '', peso_nominal: 0.0, id_tipo_producto: 2},
  {id_producto: 6, cod_producto: '110105', desc_producto: 'AMPICILINA TRIHIDRATO COMPACTADA', presentacion: 'POLVO', principio_activo: '', forma_farmaceutica: '', concentracion: '', reg_sanitario: '', peso_nominal: 0.0, id_tipo_producto: 2}];
 this.productoData = this.completerService.local(this.productos, 'desc_producto', 'desc_producto');
}

aadDetalle() {
  this.itemdetalle++;
  this.detalle.id_detin = this.itemdetalle;
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
