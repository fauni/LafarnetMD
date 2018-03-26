import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Globals } from '../../../globals';

@Component({
  selector: 'app-mainasignacion',
  templateUrl: './mainasignacion.component.html',
  styleUrls: ['./mainasignacion.component.scss']
})
export class MainasignacionComponent implements OnInit {

  constructor(public global: Globals) { }

  ngOnInit() {

  }

}
