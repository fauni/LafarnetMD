import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Globals } from '../../../globals';

@Component({
  selector: 'app-analista',
  templateUrl: './analista.component.html',
  styleUrls: ['./analista.component.scss']
})
export class AnalistaComponent implements OnInit {

  constructor(public global: Globals) { }

  ngOnInit() {

  }

}
