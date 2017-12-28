import { Component, OnInit, Renderer, ViewChild } from '@angular/core';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Publicacion } from '../../models/publicacion';
import { HomeService } from './home.service';
import { HttpErrorResponse } from '@angular/common/http';

declare var $: any;
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  scrollElement: JQuery;
  formPublicacion: FormGroup;
  submitted = false;
  submittedValues: any;
  model: any = {};
  publicacion: Publicacion = new Publicacion();
  elem: any;
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
  };

  constructor(
    private hSer: HomeService,
    private formBuilder: FormBuilder,
    private renderer: Renderer,
    public ngxSmartModalService: NgxSmartModalService) {
  }

  ngOnInit() {
    this.buildForm();
  }

  onSubmit() {
    this.submitted = true;
    if (this.elem.files.length > 0) {
      console.log(this.elem.files[0]);
      let formData = new FormData();
      formData.append('file', this.elem.files[0]);
      formData.append('username', 'faruni');
      formData.append('id_area', '1');
      formData.append('tipo_publicacion', '1');
      formData.append('titulo', this.publicacion.titulo);
      formData.append('fechaCaduca', this.publicacion.fechaCaduca);

      this.hSer.upload(formData).subscribe(
        data => {
          console.log(data);
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
  }
}
