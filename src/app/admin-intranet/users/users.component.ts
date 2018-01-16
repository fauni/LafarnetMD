import { Component, OnInit } from '@angular/core';
import { UsersService } from './users.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Users } from './users';
import { Globals } from '../../globals';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  user: Users;
  userAll: any;
  estadoValue = true;
  constructor(private sdata: UsersService, private global: Globals, private router: Router) { }

  ngOnInit() {
    this.onLoadUsers();
  }

  onLoadUsers() {
    this.user = new Users();
    this.sdata.getUsers().subscribe(
      data => {
        this.userAll = data.body;
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

  editUser(username: string) {
    this.user = new Users();
    this.sdata.getUser(username).subscribe(
      data => {
        this.user.userid = data.body[0].userid;
        this.user.first_name = data.body[0].first_name;
        this.user.last_name = data.body[0].last_name;
        this.user.email_address = data.body[0].email_address;
        this.user.username = data.body[0].username;
        this.user.password = data.body[0].password;
        this.user.id_cargo = data.body[0].id_cargo;
        this.user.id_regional = data.body[0].id_regional;
        this.user.id_grupo = data.body[0].id_grupo;
        this.user.id_superior = data.body[0].id_superior;
        this.user.id_area = data.body[0].id_area;
        this.user.id_seccion = data.body[0].id_seccion;
        this.user.foto = data.body[0].foto;
        this.user.estado = data.body[0].estado;
        this.user.usuario_creacion = data.body[0].usuario_creacion;
        this.user.fecha_creacion = data.body[0].fecha_creacion;
        this.user.usuario_modificacion = data.body[0].usuario_modificacion;
        this.user.fecha_modificacion = data.body[0].fecha_modificacion;
        console.log(this.user);
        this.router.navigate(['/admin/profile', this.user]);
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
