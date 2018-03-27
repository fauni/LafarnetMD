import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Globals } from '../../../../globals';


@Component({
  selector: 'app-addingresos',
  templateUrl: './addingresos.component.html',
  styleUrls: ['./addingresos.component.scss']
})
export class AddingresosComponent implements OnInit {

  constructor(public global: Globals) { }
  public options: Pickadate.DateOptions = {
    format: 'dd/mm/yyyy',
    formatSubmit: 'yyyy-mm-dd',
    today: 'HOY',
    closeOnSelect: true
  };
  public dateOfBirth = '2017-08-12'; // use formatSubmit format to set datepicker value

  ngOnInit() {

  }
 }
