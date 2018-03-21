import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Globals } from '../../../globals';

@Component({
  selector: 'app-certificadosmp',
  templateUrl: './certificadosmp.component.html',
  styleUrls: ['./certificadosmp.component.scss']
})
export class CertificadosmpComponent implements OnInit {

  constructor(public global: Globals) { }

  ngOnInit() {
    
  }

}
