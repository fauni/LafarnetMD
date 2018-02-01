import { Component, OnInit } from '@angular/core';
import { Globals } from '../../../globals';
import { Ng4FilesSelected, Ng4FilesStatus, Ng4FilesService, Ng4FilesConfig } from '../../../ng4-files/index';
import { Users } from '../users';
import { NgForm, EmailValidator, FormGroup } from '@angular/forms';
import { CargosService } from '../../cargos/cargos.service';
import { Cargos } from '../../cargos/cargos';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {
  userForm: FormGroup;

  cargo: Cargos;
  cargos: any;
  errorMessages = {
    first_name: {
      required: 'Es necesario que ingrese su(s) Nombre(s)',
    },
    last_name: {
      required: 'Es necesario que ingrese sus Apellidos',
    },
    email_address: {
      required: 'Correo no valido',
      email: ' (ejemplo@lafar.net)'
    },
    username: {
      required: 'Nombre de usuario requerido',
    },
    password: {
      required: 'Clave de acceso requerida',
    },
    cargo: {
      required: 'Seleccione un Cargo'
    }
  };

  public selectedFiles;
  urlFotoPerfil: string;

  UserModel = new Users();

  constructor(private global: Globals, private servCargo: CargosService) { }

  ngOnInit() {
    this.urlFotoPerfil = this.global.urlImagenUserDefault;
    this.onLoadCargos();
  }

  onSubmit(f: NgForm) {
    console.log('Formulario: ' + f);
  }

  public filesSelect(selectedFiles: Ng4FilesSelected): void {
    if (selectedFiles.status !== Ng4FilesStatus.STATUS_SUCCESS) {
      this.selectedFiles = selectedFiles.status;
      return;
    }

    this.selectedFiles = Array.from(selectedFiles.files).map(file => file.name);
    let fileSelect: File = selectedFiles.files[0];
    let img = document.querySelector("#preview img");
    let reader = new FileReader();
    this.readFile(fileSelect, reader, (result) => {
      img.setAttribute('src', reader.result);
    });
  }

  readFile(file, reader, callback) {
    reader.onload = () => {
        callback(reader.result);
        //this.model.student_img = reader.result;
        //console.log(reader.result);
    }
    reader.readAsDataURL(file);
  }

  onLoadCargos() {
    this.cargo = new Cargos();
      this.servCargo.getCargos().subscribe(
      data => {
        this.cargos = data.body;
        console.log(this.cargos);
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

  buildForm() {

  }

  cargarFotoUsuario() {

  }

}
