import { Component, OnInit } from '@angular/core';
import { HomeService } from '../home.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-lista-publicacion',
  templateUrl: './lista-publicacion.component.html',
  styleUrls: ['./lista-publicacion.component.css']
})
export class ListaPublicacionComponent implements OnInit {
  public publications: any;
  public urlImages: string;
  constructor(private hSer: HomeService) {
    this.urlImages = 'http://localhost:8888/newapilafarnet/assets/publicaciones_images/';
  }
  ngOnInit() {
    this.onLoadPublications();
  }

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
}
}
