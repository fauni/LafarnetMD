import { Component, OnInit } from '@angular/core';
import {Ingresos} from '../ingresos';
import { Router, ActivatedRoute } from '@angular/router';
import { Globals } from '../../../../globals';


@Component({
  selector: 'app-listingresos',
  templateUrl: './listingresos.component.html',
  styleUrls: ['./listingresos.component.scss']
})
export class ListingresosComponent implements OnInit {
   ingreso: Ingresos;
   public ingresos: Array<Ingresos>;
   filter: any;
   // Ordenacion
   key: string = 'nombre';
   reverse: boolean = false;
  constructor(public global: Globals) { }

  public options: Pickadate.DateOptions = {
    format: 'dd/mm/yyyy',
    formatSubmit: 'yyyy-mm-dd',
    today: 'Hoy'
  };

  public dateOfBirth = '2017-08-12';

  ngOnInit() {
    this.onLoadIngresos();
  }
  onLoadIngresos() {
this.ingresos = [{id_ingreso: 1, codigo: 'ING0001', fecha: '10/10/2017', glosa: ' ', id_proveedor: 1},
{id_ingreso: 2, codigo: 'ING0002', fecha: '11/10/2017', glosa: ' ', id_proveedor: 2},
{id_ingreso: 3, codigo: 'ING0003', fecha: '12/10/2017', glosa: ' ', id_proveedor: 1},
{id_ingreso: 4, codigo: 'ING0004', fecha: '01/01/2018', glosa: ' ', id_proveedor: 3}
];
  }
  sort(key) {
    this.key = key;
    this.reverse = !this.reverse;
  }

  p: number = 1;
}
