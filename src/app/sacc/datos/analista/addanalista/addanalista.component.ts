import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Globals } from '../../../../globals';
import { UsersService } from '../../../../admin-intranet/users/users.service';
import { Users } from '../../../../admin-intranet/users/users';
import { CompleterService, CompleterData } from 'ng2-completer';
import { HttpErrorResponse } from '@angular/common/http/src/response';
import { CompleterItem } from 'ng2-completer/components/completer-item';
import { Analista } from '../analista';
import { Grado } from '../grado';
import { Especialidad } from '../especialidad';
import { NotificationsService } from 'angular2-notifications';
import { AnalistasService } from '../analista.service';


@Component({
  selector: 'app-addanalista',
  templateUrl: './addanalista.component.html',
  styleUrls: ['./addanalista.component.scss']
})
export class AddanalistaComponent implements OnInit {
  user: Users;
  users: any;
  userData: CompleterData;

  public grados: Array<Grado>;
  public especialidades: Array<Especialidad>;

  //Imagen Firma
  public urlImagenFirma: string;
  isFileCharged: boolean = false;

  //Subir archivos
  elem: any;

  analista: Analista;

  constructor(
    private router: Router,
    private servNotification: NotificationsService,
    public global: Globals,
    private servUser: UsersService,
    private servAnalista: AnalistasService,
    private completerService: CompleterService) {
      this.analista = new Analista();
      this.urlImagenFirma = this.global.urlImagenFirmaDefault;
      this.isFileCharged = false;
    }

  ngOnInit() {
    this.onLoadUsers();
    this.onLoadGrados();
    this.onLoadEspecialidades();
  }

  onLoadUsers() {
    this.user = new Users();
      this.servUser.getUsers().subscribe(
      data => {
        this.users = data.body;
        console.log('Usuarios cargados correctamente');

        this.userData = this.completerService.local(this.users, 'username', 'username');
        console.log('-------------------------->--------->');
        console.log(this.userData);
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
  onLoadGrados() {
    this.grados = [
      {id: '1', sigla: 'Dr.', descripcion: '', usuario_creacion: '', fecha_creacion: '', usuario_modificacion: '', fecha_modificacion: ''},
      {id: '2', sigla: 'Dra.', descripcion: '', usuario_creacion: '', fecha_creacion: '', usuario_modificacion: '', fecha_modificacion: ''},
      {id: '3', sigla: 'Lic.', descripcion: '', usuario_creacion: '', fecha_creacion: '', usuario_modificacion: '', fecha_modificacion: ''},
      {id: '4', sigla: 'Ing.', descripcion: '', usuario_creacion: '', fecha_creacion: '', usuario_modificacion: '', fecha_modificacion: ''},
      {id: '5', sigla: 'TS.', descripcion: '', usuario_creacion: '', fecha_creacion: '', usuario_modificacion: '', fecha_modificacion: ''}
    ];
  }
  onLoadEspecialidades() {
    this.especialidades = [
      {id: '1', descripcion: 'BIOQUIMICO', usuario_creacion: '', fecha_creacion: '', usuario_modificacion: '', fecha_modificacion: ''},
      {id: '2', descripcion: 'FARMACÉUTICO', usuario_creacion: '', fecha_creacion: '', usuario_modificacion: '', fecha_modificacion: ''},
      {id: '3', descripcion: 'QUIMICO', usuario_creacion: '', fecha_creacion: '', usuario_modificacion: '', fecha_modificacion: ''},
      {id: '4', descripcion: 'BIOQUIMICO-FARMACÉUTICO', usuario_creacion: '', fecha_creacion: '', usuario_modificacion: '', fecha_modificacion: ''},
      {id: '5', descripcion: 'QUIMICO-FARMACÉUTICO', usuario_creacion: '', fecha_creacion: '', usuario_modificacion: '', fecha_modificacion: ''}
    ];
  }
  onSelectUser(selected: CompleterItem): void {
    if (selected) {
      this.user = selected.originalObject;
      console.log(this.user);
      /*this.UserModel.id_cargo = selected.originalObject['id'];
      */
    } else {
      console.log('Vacio');
    }
  }


  uploadImageFirma(event) {
    this.elem = event.target;
    let img = document.querySelector('.row .col img');
    let reader = new FileReader();
    this.readFile(event.target.files[0], reader, (result) => {
      this.isFileCharged = true;
      img.setAttribute('src', reader.result);
    });
  }

  readFile(file, reader, callback) {
    reader.onload = () => {
        callback(reader.result);
    }
    reader.readAsDataURL(file);
  }

  onSubmit() {
    if (this.elem) {
      if (this.elem.files.length >= 0) {
          let formData = new FormData();
          formData.append('fileImagen', this.elem.files[0]);
          formData.append('codigo', this.analista.codigo);
          formData.append('username', this.user.username);
          formData.append('grado', this.analista.grado);
          formData.append('especialidad', this.analista.especialidad);
          formData.append('id_firma', this.user.username);
          formData.append('usuario_creacion', localStorage.getItem('username'));
          formData.append('usuario_modificacion', localStorage.getItem('username'));

          this.servAnalista.setAnalistas(formData).subscribe(
            data => {
              if (data.status == 200) {
                this.openNotificacion(1, 'Correcto!', 'Se guardo correctamente');
                this.router.navigate(['/sacc/datos/analista']);
                //this.router.navigate(['/admin/users/list']);
              }else {
                this.openNotificacion(3, 'No se guardo', 'Intente nuevamente!');
              }
            }, (err: HttpErrorResponse) => {
              if (err.error instanceof Error) {
                // A client-side or network error occurred. Handle it accordingly.
                console.log('Ocurrio un error:', err.error.message);
              } else {
                // The backend returned an unsuccessful response code.
                // The response body may contain clues as to what went wrong,
                console.log(`El servidor respondio: ${err.status}, body was: ${err.error}`);
              }
              this.openNotificacion(3, 'Ocurrio un error', 'Comuniquese con el Administrador');
            }
          );
        }else {
          this.openNotificacion(3, 'Ocurrio un error', 'Revise el Formato o Tamaño de la Imagen');
        }
  }else {
    this.openNotificacion(2, 'Seleccione una', 'firma para el Analista');
  }
  }

  openNotificacion(tipo: number, titulo: string, mensaje: string) {
    switch (tipo) {
      case 1:
        this.servNotification.success(
          titulo,
          mensaje,
          {
              timeOut: 2000,
              showProgressBar: true,
              pauseOnHover: false,
              clickToClose: false,
              maxLength: 10
          }
        );
      break;
      case 2:
        this.servNotification.alert(
          titulo,
          mensaje,
          {
              timeOut: 2000,
              showProgressBar: true,
              pauseOnHover: false,
              clickToClose: false,
              maxLength: 10
          }
        );
      break;
      case 3:
        this.servNotification.error(
          titulo,
          mensaje,
          {
              timeOut: 2000,
              showProgressBar: true,
              pauseOnHover: false,
              clickToClose: false,
              maxLength: 10
          }
        );
      break;
    }
  }
}
