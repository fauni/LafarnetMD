import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Globals } from '../../../globals';

@Component({
  selector: 'app-maindatos',
  templateUrl: './maindatos.component.html',
  styleUrls: ['./maindatos.component.scss']
})
export class MaindatosComponent implements OnInit {

  constructor(public global: Globals) { }

  ngOnInit() {

  }

}
