import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Globals } from '../../../../globals';


@Component({
  selector: 'app-addproveedor',
  templateUrl: './addproveedor.component.html',
  styleUrls: ['./addproveedor.component.scss']
})
export class AddproveedorComponent implements OnInit {
  protocolo: string = '12';
  constructor(public global: Globals) { }

  ngOnInit() {

  }
}
