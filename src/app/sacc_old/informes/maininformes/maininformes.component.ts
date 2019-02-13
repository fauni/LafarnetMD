import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Globals } from '../../../globals';

@Component({
  selector: 'app-maininformes',
  templateUrl: './maininformes.component.html',
  styleUrls: ['./maininformes.component.scss']
})
export class MaininformesComponent implements OnInit {

  constructor(public global: Globals) { }

  ngOnInit() {

  }

}
