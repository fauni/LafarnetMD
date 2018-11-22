import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RolesService } from './roles.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Rol } from './roles';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.scss']
})
export class RolesComponent implements OnInit {
    codigo_aplicacion: string = '';
    public lrol: Array<Rol> = new Array<Rol>();

  constructor(private route: ActivatedRoute, private servRoles: RolesService) { 
    this.route.params.subscribe(params => {
        this.codigo_aplicacion = params['id'].toString();
        this.onLoadRoles(this.codigo_aplicacion);
    });
  }

  ngOnInit() {
      //alert(this.codigo_aplicacion);
  }

  onLoadRoles(code){
    this.servRoles.getRolesForApps(code).subscribe(
        data => {
            this.lrol = data['body'];
          console.log("Roles Cargados Correctamente!!");
          console.log(data);
        },
        (err: HttpErrorResponse) => {
          if (err.error instanceof Error) {
            // A client-side or network error occurred. Handle it accordingly.
            console.log('Ocurrio un error:', err.error.message);
          } else {
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong,
            console.log(`El servidor respondio: {err.status}, body was: {err.error}`);
          }
        }
    );
  }

}
