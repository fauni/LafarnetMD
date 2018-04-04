import { Component, OnInit } from '@angular/core';
import {Ingresos} from '../ingresos';
import { Router, ActivatedRoute } from '@angular/router';
import { Globals } from '../../../../globals';
import { IngresosService } from '../ingresos.service';
import { HttpErrorResponse } from '@angular/common/http';


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
  constructor(public global: Globals, private servIngresos: IngresosService) { }

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
    this.ingreso = new Ingresos();
      this.servIngresos.getIngresos().subscribe(
      data => {
        this.ingresos = data.body;
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
  cambiaFormatofecha(fecha: string) {
    const res = fecha.split('-');
    const fechasal = res[2] + '/' + res[1] + '/' + res[0];
    //console.log (fechasal);
    return fechasal;
  }
  sort(key) {
    this.key = key;
    this.reverse = !this.reverse;
  }

  p: number = 1;


  
}
