import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Globals } from '../../../globals';
import { AnalistasService } from '../../datos/analista/analista.service';
import {Analista} from '../../datos/analista/analista';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-mainasignacion',
  templateUrl: './mainasignacion.component.html',
  styleUrls: ['./mainasignacion.component.scss']
})
export class MainasignacionComponent implements OnInit {
  public analista: Analista = new Analista();
  constructor(public global: Globals, private servanalist: AnalistasService) { }

  ngOnInit() {
   this.onLoadAnalistas();
  }
  onLoadAnalistas() {
    const usr =  localStorage.getItem('username');
    this.servanalist.getAnalistaForUserName(usr).subscribe(
      data => {
        // console.log(data);
        data.body.forEach(element => {
          this.analista = element;
        });
        console.log('Analista cargado correctamente!');
        console.log(this.analista);
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
  botones() {
   if (this.analista.rol == 'admin') {
     return true;
   } else {
     return false;
   }
  }
}
