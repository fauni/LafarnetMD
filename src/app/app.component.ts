import { Component, OnInit } from '@angular/core';
import { CookieService } from 'angular2-cookie/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(private _cookieService: CookieService, private router: Router) {
  }
  ngOnInit() {
    if (this._cookieService.get('username') != null) {
      console.log('TRUE');
      if (this._cookieService.get('estado') == '4') {
        this.router.navigate(['/admin/users/clave']);
      }
    }else {
      console.log('FALSE');
      this.router.navigate(['/login']);
    }
  }

}
