import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Globals } from '../../../../globals';
import { Analista } from '../analista';
import { AnalistasService } from '../analista.service';
import { HttpErrorResponse } from '@angular/common/http/src/response';


@Component({
  selector: 'app-detailanalista',
  templateUrl: './detailanalista.component.html',
  styleUrls: ['./detailanalista.component.scss']
})
export class DetailanalistaComponent implements OnInit {
  public analista: Analista;
  public codigo: string = '';

  constructor(public global: Globals, public servAnalistas: AnalistasService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
        this.onLoadAnalista(params['id'].toString());
    });
  }

  onLoadAnalista(codigo) {
    this.analista = new Analista();
    this.servAnalistas.getAnalistaForCode(codigo).subscribe(
      data => {
        this.analista = data.body[0];
        console.log('La información fue cargada correctamente!');
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

}
