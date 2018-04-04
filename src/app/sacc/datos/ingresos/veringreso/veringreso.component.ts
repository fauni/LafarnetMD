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
    selector: 'app-veringreso',
    templateUrl: './veringreso.component.html',
    styleUrls: ['./veringreso.component.scss']
})
export class VeringresoComponent implements OnInit {
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
      alert(params['idi']);
        //this.username = params['id'].toString();
        //this.onLoadUser(atob(this.username));
    });
   }
}
