import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { UsersService } from '../users/users.service';
import { Users } from '../users/users';
import { AppsService } from '../apps/apps.service';
import {AppsChk} from '../apps/appschk';
@Component( {
  selector: 'app-admusersapps',
  templateUrl: './adminusersapps.component.html',
  styleUrls: ['./adminusersapps.component.scss']
})
export class AdminUsersAppsComponent implements OnInit {
  public sub: Users;
  public username = '';
  public aplicaciones: Array<AppsChk>;
  constructor(private sdata: UsersService, private servapps: AppsService, private route: Router, private router: ActivatedRoute) { }
  ngOnInit() {
    this.router.params
            .subscribe(params => {
                this.username = params['id'].toString();
            });
    this.onloadusuario();
    // console.log('aplicaciones para el usuario {{this.username}}');
    this.onloadAplicaciones();
  }
  onloadusuario() {
    this.sdata.getUser(this.username).subscribe(
      data => {
        data.body.forEach(element => {
          this.sub = element;
         // console.log('datos del usuario del cual se administrara las aplicaciones');
          console.log(this.sub);
        });
      },
      (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          // A client-side or network error occurred. Handle it accordingly.
          console.log('Ocurrio un error:', err.error.message);
        } else {
          // The backend returned an unsuccessful response code.
          // The response body may contain clues as to what went wrong,
         // console.log(`El servidor respondio: ${err.status}, body was: ${err.error}`);
        }
      }
    );
  }
  onloadAplicaciones() {
    this.servapps.getAllChk().subscribe(
      data => {
        this.aplicaciones = data.body;
         // console.log('datos todas las aplicaciones existentes');
         console.log('aplicaciones creadas');
           console.log(this.aplicaciones);
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
