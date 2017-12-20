import { Component, OnInit } from '@angular/core';
declare var $: any;
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  scrollElement: JQuery;
  constructor() { 
    $('.modal').modal();
  }

  ngOnInit() {

  }

  openModal() {
    $('#modal1').modal('open');
  }
}
