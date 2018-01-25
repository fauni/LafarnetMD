import { Component, OnInit } from '@angular/core';
import { Globals } from '../../../globals';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {

  constructor(private global: Globals) { }

  ngOnInit() {
  }

  cargarFotoUsuario() {

  }
}
