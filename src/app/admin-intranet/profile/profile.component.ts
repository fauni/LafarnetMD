import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Users } from '../users/users';
import { Globals } from '../../globals';
import { AppsForUser } from '../../layout/components/header/appsforuser';
import { LayoutService } from '../../layout/layout.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  user: Users;
  private sub: any;
  private apps: any;
  private appsforuser: AppsForUser;
  constructor(private route: ActivatedRoute, private global: Globals, private layoutService: LayoutService) { }

  ngOnInit() {
    this.user = new Users();
    this.onLoadUser();
    this.onLoadApps(this.user.username);
  }

  onLoadUser() {
    this.sub = this.route.params.subscribe(params => {
      this.user.userid = params['userid'];
      this.user.first_name = params['first_name'];
      this.user.last_name = params['last_name'];
      this.user.email_address = params['email_address'];
      this.user.username = params['username'];
      this.user.password = params['password'];
      this.user.id_cargo = params['id_cargo'];
      this.user.id_regional = params['id_regional'];
      this.user.id_grupo = params['id_grupo'];
      this.user.id_superior = params['id_superior'];
      this.user.id_area = params['id_area'];
      this.user.id_seccion = params['id_seccion'];
      this.user.foto = params['foto'];
      this.user.estado = params['estado'];
      this.user.usuario_creacion = params['usuario_creacion'];
      this.user.fecha_creacion = params['fecha_creacion'];
      this.user.usuario_modificacion = params['usuario_modificacion'];
      this.user.fecha_modificacion = params['fecha_modificacion'];
    });
  }

  onLoadApps(username): void {
    this.appsforuser = new AppsForUser(username);
    this.layoutService.AppsForUser(this.appsforuser).subscribe(
      data => {
          this.apps = data.body;
          console.log(this.apps);
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

  enviarMensaje() {
    alert('Enviar Mensaje');
  }
}
