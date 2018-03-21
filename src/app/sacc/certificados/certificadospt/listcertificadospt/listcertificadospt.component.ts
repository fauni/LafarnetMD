import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Globals } from '../../../../globals';


@Component({
  selector: 'app-listcertificadospt',
  templateUrl: './listcertificadospt.component.html',
  styleUrls: ['./listcertificadospt.component.scss']
})
export class ListcertificadosptComponent implements OnInit {

  constructor(public global: Globals) { }

  ngOnInit() {

  }

}
