import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Globals } from '../../../../globals';


@Component({
  selector: 'app-addanalista',
  templateUrl: './addanalista.component.html',
  styleUrls: ['./addanalista.component.scss']
})
export class AddanalistaComponent implements OnInit {

  constructor(public global: Globals) { }

  ngOnInit() {

  }
}
