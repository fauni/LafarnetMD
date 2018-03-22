import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Globals } from '../../../../globals';


@Component({
  selector: 'app-listproveedor',
  templateUrl: './listproveedor.component.html',
  styleUrls: ['./listproveedor.component.scss']
})
export class ListproveedorComponent implements OnInit {

  constructor(public global: Globals) { }

  ngOnInit() {

  }

}
