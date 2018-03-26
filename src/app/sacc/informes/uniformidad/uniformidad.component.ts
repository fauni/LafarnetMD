import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Globals } from '../../../globals';

@Component({
  selector: 'app-uniformidad',
  templateUrl: './uniformidad.component.html',
  styleUrls: ['./uniformidad.component.scss']
})
export class UniformidadComponent implements OnInit {

  constructor(public global: Globals) { }

  ngOnInit() {

  }

}
