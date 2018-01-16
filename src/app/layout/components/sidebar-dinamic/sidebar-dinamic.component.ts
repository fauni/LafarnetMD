import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MzSidenavComponent } from 'ng2-materialize';
import { MalihuScrollbarService } from 'ngx-malihu-scrollbar';
import { NavigationEnd, Route, Router } from '@angular/router';

abstract class SectionRoutesPair {
  section: string;
  routes: Route[];
}

@Component({
  selector: 'app-sidebar-dinamic',
  templateUrl: './sidebar-dinamic.component.html',
  styleUrls: ['./sidebar-dinamic.component.css']
})
export class SidebarDinamicComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('sidenav') sidenav: MzSidenavComponent;
    groupedRoutes: Array<SectionRoutesPair>;
    scrollElement: JQuery;
  
    constructor(
      private router: Router,
      private mScrollbarService: MalihuScrollbarService,
    ) { }
  
    ngOnInit() {
      this.populateSideNavWithRoutesGroupedBySections();
      this.setNavigationEndEvent();
    }
  
    ngAfterViewInit() {
      this.initElement();
      this.initScrollbar();
    }

    ngOnDestroy() {
      this.mScrollbarService.destroy(this.scrollElement);
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
}
