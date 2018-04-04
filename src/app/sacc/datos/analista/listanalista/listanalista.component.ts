import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Globals } from '../../../../globals';
import { Analista } from '../analista';
import { AnalistasService } from '../analista.service';
import { HttpErrorResponse } from '@angular/common/http/src/response';


@Component({
  selector: 'app-listanalista',
  templateUrl: './listanalista.component.html',
  styleUrls: ['./listanalista.component.scss']
})
export class ListanalistaComponent implements OnInit {
  analista:  Analista;
  analistas: any;
  filter: any;

  // Ordenacion
  key: string = 'codigo';
  reverse: boolean = false;

  constructor(public global: Globals, public servAnalistas: AnalistasService) { }

  ngOnInit() {
    this.onLoadAnalistas();
  }

  onLoadAnalistas() {
    this.analista = new Analista();
    this.servAnalistas.getAnalistas().subscribe(
      data => {
        this.analistas = data.body;
        console.log('Analistas cargados correctamente!');
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

  abrirDetail(cod) {
    alert(cod);
  }
}
