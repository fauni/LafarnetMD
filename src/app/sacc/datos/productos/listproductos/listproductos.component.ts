import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Globals } from '../../../../globals';


@Component({
  selector: 'app-listproductos',
  templateUrl: './listproductos.component.html',
  styleUrls: ['./listproductos.component.scss']
})
export class ListproductosComponent implements OnInit {
  filter: any;
  constructor(public global: Globals) { }

  ngOnInit() {

  }

}
