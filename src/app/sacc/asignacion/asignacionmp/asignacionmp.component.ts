import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Globals } from '../../../globals';

@Component({
  selector: 'app-asignacionmp',
  templateUrl: './asignacionmp.component.html',
  styleUrls: ['./asignacionmp.component.scss']
})
export class AsignacionmpComponent implements OnInit {

  constructor(public global: Globals) { }

  ngOnInit() {

  }

}
