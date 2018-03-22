import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Globals } from '../../../globals';

@Component({
  selector: 'app-certificadospt',
  templateUrl: './certificadospt.component.html',
  styleUrls: ['./certificadospt.component.scss']
})
export class CertificadosptComponent implements OnInit {

  constructor(public global: Globals) { }

  ngOnInit() {

  }

}
