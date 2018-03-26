import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Globals } from '../globals';
import { CookieService } from 'angular2-cookie/core';
@Component({
  selector: 'app-sacc',
  templateUrl: './sacc.component.html',
  styleUrls: ['./sacc.component.scss']
})
export class SaccComponent implements OnInit {

  constructor(private __Cookie: CookieService) { }

  ngOnInit() {
  }
}
