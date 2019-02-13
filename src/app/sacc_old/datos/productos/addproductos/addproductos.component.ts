import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Globals } from '../../../../globals';


@Component({
  selector: 'app-addproductos',
  templateUrl: './addproductos.component.html',
  styleUrls: ['./addproductos.component.scss']
})
export class AddproductosComponent implements OnInit {
  protocolo: string = '12';
  constructor(public global: Globals) { }

  ngOnInit() {

  }

  
}
