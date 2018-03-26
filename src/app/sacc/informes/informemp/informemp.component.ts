import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Globals } from '../../../globals';

@Component({
  selector: 'app-informemp',
  templateUrl: './informemp.component.html',
  styleUrls: ['./informemp.component.scss']
})
export class InformempComponent implements OnInit {

  constructor(public global: Globals) { }

  ngOnInit() {

  }

}
