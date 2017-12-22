import { Component, OnInit, Renderer, ViewChild } from '@angular/core';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Publicacion } from '../../models/publicacion';

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
  publicacion: Publicacion;

  options: Pickadate.DateOptions = {
    clear: 'Borrar', // Clear button text
    close: 'Ok',    // Ok button text
    today: 'Hoy', // Today button text
    closeOnClear: true,
    closeOnSelect: false,
    format: 'dd-mm-yyyy',
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

  constructor(private formBuilder: FormBuilder,
    private renderer: Renderer,
    public ngxSmartModalService: NgxSmartModalService) {

  }

  ngOnInit() {
    this.buildForm();
  }

  onSubmit() {
    this.submitted = true;
  }

  buildForm() {
    this.formPublicacion = this.formBuilder.group({
      titulo: '',
      fechaCaduca: '01-01-1990'
    });
  }
}
