import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-addsc',
  templateUrl: './addsc.component.html',
  styleUrls: ['./addsc.component.scss'],
})
export class AddscComponent implements OnInit {
  tipo_solicitud: string;
  constructor() { }

  ngOnInit() {
    this.tipo_solicitud = 'a';
  }

}
