import { Component, OnInit, Input } from '@angular/core';
import { HomeService } from '../home.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NgxSmartModalService } from 'ngx-smart-modal';

declare var $: any;

@Component({
  selector: 'app-lista-publicacion',
  templateUrl: './lista-publicacion.component.html',
  styleUrls: ['./lista-publicacion.component.scss']
})
export class ListaPublicacionComponent implements OnInit {
  @Input() publications: any;

  public nombreElemento: string;
  //public publications: any;
  public urlImages: string;

  //constructor(private hSer: HomeService) {  //Borrar
  constructor(
    private hSer: HomeService,
    private ngxModalPublicacion: NgxSmartModalService
  ) {
    this.urlImages = 'http://localhost:8888/newapilafarnet/assets/publicaciones_images/';
    this.nombreElemento = 'publicacion.jpg';
  }

  ngOnInit() {
    //this.onLoadPublications(); //Borrar
  }


  openVistaPrevia() {
    this.ngxModalPublicacion.getModal('myModalPublicacion').open();
  }
  /*
  onLoadPublications(): void {
    this.hSer.getPublications().subscribe(
        data => {
            console.log(data);
            this.publications = data.body;
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
  }*/
}
