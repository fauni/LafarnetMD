import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Globals } from '../../../../globals';


@Component({
  selector: 'app-listanalista',
  templateUrl: './listanalista.component.html',
  styleUrls: ['./listanalista.component.scss']
})
export class ListanalistaComponent implements OnInit {

  constructor(public global: Globals) { }

  ngOnInit() {

  }

}
