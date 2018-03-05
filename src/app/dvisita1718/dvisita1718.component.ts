import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Globals } from '../globals';
@Component({
  selector: 'app-dvisita1718',
  templateUrl: './dvisita1718.component.html',
  styleUrls: ['./dvisita1718.component.scss']
})
export class Dvisita1718Component implements OnInit {

  constructor(private route: ActivatedRoute, private router: Router, public global: Globals) { }

  ngOnInit() {
    //window.location.href = 'http://192.168.1.213/lafarnet/proforms_dos/';
    //window.open(this.global.urlIntranet + 'lafarnet/proforms_dos/', '_blank');
    window.open(this.global.urlIntranet + 'admin_dvisita/', '_blank');
    this.router.navigate(['/home']);
  }

}
