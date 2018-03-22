import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Globals } from '../../../../globals';


@Component({
  selector: 'app-addcertificadosmp',
  templateUrl: './addcertificadosmp.component.html',
  styleUrls: ['./addcertificadosmp.component.scss']
})
export class AddcertificadosmpComponent implements OnInit {
  protocolo: string = '12';
  constructor(public global: Globals) { }

  ngOnInit() {

  }

  
}
