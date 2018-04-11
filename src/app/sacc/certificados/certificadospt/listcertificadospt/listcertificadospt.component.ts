import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Globals } from '../../../../globals';
import { CertificadosService } from '../../certificados.service';
import { HttpErrorResponse } from '@angular/common/http/src/response';
import { Certificados } from '../../certificados';


@Component({
  selector: 'app-listcertificadospt',
  templateUrl: './listcertificadospt.component.html',
  styleUrls: ['./listcertificadospt.component.scss']
})
export class ListcertificadosptComponent implements OnInit {
  certificados: Array<Certificados>;

  filter: any;

  // Ordenacion
  key: string = 'codigo_certificado';
  reverse: boolean = false;
  constructor(public global: Globals, private servCertificados: CertificadosService) { }

  ngOnInit() {
    this.onLoadCertificados();
  }

  onLoadCertificados() {
    this.certificados = new Array<Certificados>();
    this.servCertificados.getCertificados().subscribe(data => {
      console.log('Se cargo corredctamente los Certificados de Producto Terminado');
      //console.log(data);
      this.certificados = data['body'];
      console.log(this.certificados);
    }, (err: HttpErrorResponse) => {
      if (err.error instanceof Error) {
        console.log('Ocurrio un error:', err.error.message);
      } else {
        // The backend returned an unsuccessful response code.
        // The response body may contain clues as to what went wrong,
        console.log(`El servidor respondio: ${err.status}, body was: ${err.error}`);
      }
    });
  }

  sort(key) {
    this.key = key;
    this.reverse = !this.reverse;
  }

  p: number = 1;

}
