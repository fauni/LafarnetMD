import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Globals } from '../../../globals';

@Component({
  selector: 'app-maincertificados',
  templateUrl: './maincertificados.component.html',
  styleUrls: ['./maincertificados.component.scss']
})
export class MaincertificadosComponent implements OnInit {

  constructor(public global: Globals, private router: Router) { }

  ngOnInit() {
    this.router.navigate(['/sacc/certificados/pt']);
  }

}
