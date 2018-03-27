import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(private router: Router) {
  }
  ngOnInit() {
    if (localStorage.getItem('username') != null) {
      console.log('TRUE');
      if (localStorage.getItem('estado') == '4') {
        this.router.navigate(['/admin/users/clave']);
      }
    }else {
      console.log('FALSE');
      this.router.navigate(['/login']);
    }
  }

}
