import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Globals } from '../../../globals';

@Component({
  selector: 'app-testdisolucioni',
  templateUrl: './testdisolucioni.component.html',
  styleUrls: ['./testdisolucioni.component.scss']
})
export class TestdisolucioniComponent implements OnInit {

  constructor(public global: Globals) { }

  ngOnInit() {

  }

}
