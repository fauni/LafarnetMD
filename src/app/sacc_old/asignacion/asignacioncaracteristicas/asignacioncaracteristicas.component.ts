import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Globals } from '../../../globals';
@Component({
  selector: 'app-asigcarac',
  templateUrl: './asignacioncaracteristicas.component.html',
  styleUrls: ['./asignacioncaracteristicas.component.scss']
})
export class AsignacionCaracteristicasComponent implements OnInit {

  constructor(public global: Globals) { }

  ngOnInit() {
  }

}
