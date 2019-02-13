import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Globals } from '../../../globals';

@Component({
  selector: 'app-informept',
  templateUrl: './informept.component.html',
  styleUrls: ['./informept.component.scss']
})
export class InformeptComponent implements OnInit {

  constructor(public global: Globals) { }

  ngOnInit() {

  }

}
