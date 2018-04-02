import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Globals } from '../../../../globals';
import { Proveedor } from '../proveedor';
import { ProveedoresService } from '../proveedor.service';
import { HttpErrorResponse } from '@angular/common/http/src/response';


@Component({
  selector: 'app-listproveedor',
  templateUrl: './listproveedor.component.html',
  styleUrls: ['./listproveedor.component.scss']
})
export class ListproveedorComponent implements OnInit {
  proveedor:  Proveedor;
  proveedores: any;
  filter: any;

  // Ordenacion
  key: string = 'Cod_Proveedor';
  reverse: boolean = false;

  constructor(public global: Globals, public servProveedores: ProveedoresService) { }

  ngOnInit() {
    this.onLoadProveedores();
  }

  onLoadProveedores() {
    this.proveedor = new Proveedor();
    this.servProveedores.getProveedores().subscribe(
      data => {
        this.proveedores = data.body;
        console.log('Proveedores cargados correctamente!');
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

  p: number = 1;
}
