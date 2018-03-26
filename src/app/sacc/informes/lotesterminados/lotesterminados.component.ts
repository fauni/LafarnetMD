import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Globals } from '../../../globals';

@Component({
  selector: 'app-lotesterminados',
  templateUrl: './lotesterminados.component.html',
  styleUrls: ['./lotesterminados.component.scss']
})
export class LotesterminadosComponent implements OnInit {

  constructor(public global: Globals) { }

  ngOnInit() {

  }

}
