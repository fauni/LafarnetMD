import { Component, OnInit, Renderer, ViewChild, Input } from '@angular/core';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Publicacion } from '../../models/publicacion';
import { HomeService } from './home.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NotificationsService } from 'angular2-notifications';
import { Globals } from '../../globals';
import { ActivatedRoute, Router } from '@angular/router';

declare var $: any;
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {
  publications: any;
  scrollElement: JQuery;
  formPublicacion: FormGroup;
  submitted = false;
  submittedValues: any;
  model: any = {};
  publicacion: Publicacion = new Publicacion();
  elem: any;
  elemDoc: any;
  options: Pickadate.DateOptions = {
    clear: 'Borrar', // Clear button text
    close: 'Ok',    // Ok button text
    today: 'Hoy', // Today button text
    closeOnClear: true,
    closeOnSelect: false,
    format: 'yyyy-mm-dd',
    //formatSubmit: 'yyyy-mm-dd',
    //onClose: () => alert('Cerraste el picker.'),
    //onOpen: () => alert('abriste el picker.'),
    selectMonths: true, // Creates a dropdown to control month
    selectYears: 10,    // Creates a dropdown of 10 years to control year,
  };

  errorMessages = {
    titulo: {
      required: 'Es necesario que ingrese el Titulo'
    },
    fechaCaduca: {
      required: 'Es necesario la Fecha de Caducidad'
    },
    urlImagen : {
      required: 'Es necesario que Seleccione una imagen para mostrar'
    }
  };

  constructor(
    private router: Router,
    private global: Globals,
    private _notification: NotificationsService,
    private hSer: HomeService,
    private formBuilder: FormBuilder,
    private renderer: Renderer,
    public ngxSmartModalService: NgxSmartModalService) {
  }

  ngOnInit() {
    if (this.global.user.username) {
      console.log('TRUE');
      if (this.global.user.estado === 4) {
        this.router.navigate(['/admin/users/clave']);
      }
      this.onLoadPublications();
      this.buildForm();
    }else {
      console.log('FALSE');
      this.router.navigate(['/login']);
    }
  }

  onSubmit() {
    this.submitted = true;
    if (this.elem.files.length >= 0) {
      let formData = new FormData();
      formData.append('file', this.elem.files[0]);
      formData.append('username', this.global.user.username);
      formData.append('id_area', '1');
      formData.append('tipo_publicacion', '1');
      formData.append('titulo', this.publicacion.titulo);
      formData.append('fechaCaduca', this.publicacion.fechaCaduca);
      this.hSer.upload(formData).subscribe(
        data => {
          this._notification.success(
            'Correcto!',
            'Se publico correctamente!',
            {
                timeOut: 2000,
                showProgressBar: true,
                pauseOnHover: false,
                clickToClose: false,
                maxLength: 10
            }
          );
          console.log(data);
          this.onLoadPublications();
        },
        (err: HttpErrorResponse) => {
          console.log('error!', err);
        }
      );
    }
  }

  buildForm() {
    this.formPublicacion = this.formBuilder.group({
      titulo: '',
      fechaCaduca: '01-01-1990'
    });
  }
  uploadFile(event) {
    this.elem = event.target;
    console.log(event);
  }

  onLoadPublications(): void {
    this.hSer.getPublications().subscribe(
        data => {
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
