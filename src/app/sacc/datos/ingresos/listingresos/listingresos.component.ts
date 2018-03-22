import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Globals } from '../../../../globals';


@Component({
  selector: 'app-listingresos',
  templateUrl: './listingresos.component.html',
  styleUrls: ['./listingresos.component.scss']
})
export class ListingresosComponent implements OnInit {

  constructor(public global: Globals) { }

  ngOnInit() {

  }
}
