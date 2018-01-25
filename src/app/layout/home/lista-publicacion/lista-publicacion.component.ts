import { Component, OnInit, Input } from '@angular/core';
import { HomeService } from '../home.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { Globals } from '../../../globals';
import { DomSanitizer } from '@angular/platform-browser';
import { SafeResourceUrl } from '@angular/platform-browser/src/security/dom_sanitization_service';
import { MzModalService } from 'ng2-materialize';

declare var $: any;

@Component({
  selector: 'app-lista-publicacion',
  templateUrl: './lista-publicacion.component.html',
  styleUrls: ['./lista-publicacion.component.scss']
})
export class ListaPublicacionComponent implements OnInit {
  @Input() publications: any;

  public esExcel: boolean;
  public esWord: boolean;
  public esPdf: boolean;
  public esImagen: boolean;

  public urlImages: string;
  public urlImagesDocs: string;
  public pub: SafeResourceUrl;
  public urlViewer: string;

  //constructor(private hSer: HomeService) {  //Borrar
  constructor(
    private hSer: HomeService,
    private ngxModalPublicacion: NgxSmartModalService,
    private global: Globals,
    public sanitizer: DomSanitizer
  ) {
    this.urlImages = this.global.urlPublicaciones;
    this.urlImagesDocs = this.global.urlImagesDocs;
    this.urlViewer = 'https://docs.google.com/viewer?url=';
  }

  ngOnInit() {
    //this.onLoadPublications(); //Borrar
  }


  openVistaPrevia(name: string) {
    //alert(name);
    this.pub = this.sanitizer.bypassSecurityTrustResourceUrl(this.urlViewer + this.global.urlPublicaciones + name + '&embedded=true');
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
