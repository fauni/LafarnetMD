import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild, Input } from '@angular/core';
import { MzSidenavComponent } from 'ng2-materialize';
import { MalihuScrollbarService } from 'ngx-malihu-scrollbar';
import { NavigationEnd, Route, Router } from '@angular/router';
import { LayoutService } from '../../layout.service';
import { ItemForApp } from './itemforapp';
import { HttpErrorResponse } from '@angular/common/http';
import { Globals } from '../../../globals';
import { Users } from '../../../admin-intranet/users/users';
import { CookieService } from 'angular2-cookie/core';
import { Login } from '../../../login/login';

abstract class SectionRoutesPair {
    section: string;
    routes: Route[];
}

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit, AfterViewInit, OnDestroy {
    @ViewChild('sidenav') sidenav: MzSidenavComponent;
    @Input() idapp: any;
    public items: any;
    groupedRoutes: Array<SectionRoutesPair>;
    scrollElement: JQuery;
    public itemforapp: ItemForApp;
    user: Users = new Users();

    constructor(
      private router: Router,
      private mScrollbarService: MalihuScrollbarService,
      private lservice: LayoutService,
      public global: Globals,
      private _cookieService: CookieService
    ) { }

    ngOnInit() {
      this.getItemForApps(this.idapp);
      this.populateSideNavWithRoutesGroupedBySections();
      this.setNavigationEndEvent();
      console.log('ngOnInit');
      this.onLoadUserInformation();
    }

    ngAfterViewInit() {
      this.initElement();
      this.initScrollbar();
      console.log('ngAfterViewInit');
    }

    ngOnDestroy() {
      this.mScrollbarService.destroy(this.scrollElement);
      console.log('ngOnDestroy');
    }

    initElement() {
      this.scrollElement = $(`#${this.sidenav.id}`);
    }

    initScrollbar() {
      this.mScrollbarService.initScrollbar(this.scrollElement, { axis: 'y', theme: 'minimal', scrollInertia: 100 });
    }

    populateSideNavWithRoutesGroupedBySections() {
      // Take all routes with data and group them by sections
      this.groupedRoutes = this.router.config.reduce<Array<SectionRoutesPair>>(
        (returnValues, currentValue) => {
          if (currentValue.data) {
            const section = currentValue.data['section'];
            const existingSection = returnValues.find((r) => r && r.section === section);

            if (existingSection) {
              existingSection.routes.push(currentValue);
            } else {
              returnValues.push({ section: section, routes: [currentValue] });
            }
          }
          return returnValues;
        },
        new Array<SectionRoutesPair>());
    }

    setNavigationEndEvent() {
      // scroll to top on each route change
      this.router.events
        .filter(event => event instanceof NavigationEnd)
        .subscribe(() => window.scrollTo(0, 0));
    }

    onLoggedout() {
      localStorage.removeItem('isLoggedin');
    }
    onLoadUserInformation() {
      this.user.userid = this._cookieService.get('userid');
      this.user.first_name = this._cookieService.get('first_name');
      this.user.last_name = this._cookieService.get('last_name');
      this.user.email_address = this._cookieService.get('email_address');
      this.user.username = this._cookieService.get('username');
      this.user.password = this._cookieService.get('password');
      this.user.id_cargo = this._cookieService.get('id_cargo');
      this.user.cargo = this._cookieService.get('cargo');
      this.user.id_regional = this._cookieService.get('id_regional');
      this.user.regional = this._cookieService.get('regional');
      this.user.id_grupo = this._cookieService.get('id_grupo');
      this.user.id_superior = this._cookieService.get('id_superior');
      this.user.id_area = this._cookieService.get('id_area');
      this.user.area = this._cookieService.get('area');
      this.user.id_seccion = this._cookieService.get('id_seccion');
      this.user.foto = this._cookieService.get('foto');
      this.user.estado = Number(this._cookieService.get('estado'));
      this.user.usuario_creacion = this._cookieService.get('usuario_creacion');
      this.user.fecha_creacion = this._cookieService.get('fecha_creacion');
      this.user.usuario_modificacion = this._cookieService.get('usuario_modificacion');
      this.user.fecha_modificacion = this._cookieService.get('fecha_modificacion');
  }

    getItemForApps(idApp): void {
      this.itemforapp = new ItemForApp(idApp);
      this.lservice.ItemForApps(this.itemforapp).subscribe(
        data => {
          console.log(data.body);
          this.items = data.body;
        },
        (err: HttpErrorResponse) => {
          if (err.error instanceof Error) {
            // A client-side or network error occurred. Handle it accordingly.
            console.log('Ocurrio un error:', err.error.message);
          } else {
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong,
            console.log(`El servidor respondio: ${err.status}, body was: ${err.error}`);
          }
        }
      );
    }
}
