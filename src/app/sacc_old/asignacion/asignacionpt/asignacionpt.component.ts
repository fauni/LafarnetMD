import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Globals } from '../../../globals';

@Component({
  selector: 'app-asignacionpt',
  templateUrl: './asignacionpt.component.html',
  styleUrls: ['./asignacionpt.component.scss']
})
export class AsignacionptComponent implements OnInit {

  constructor(public global: Globals) { }

  ngOnInit() {

  }

}
