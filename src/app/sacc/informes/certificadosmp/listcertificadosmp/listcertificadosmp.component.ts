import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Globals } from '../../../../globals';


@Component({
  selector: 'app-listcertificadosmp',
  templateUrl: './listcertificadosmp.component.html',
  styleUrls: ['./listcertificadosmp.component.scss']
})
export class ListcertificadosmpComponent implements OnInit {

  constructor(public global: Globals) { }

  ngOnInit() {

  }

}
