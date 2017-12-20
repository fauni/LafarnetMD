import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutRoutingModule } from './layout-routing.module';
import { HeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';

import { MzButtonModule, MzIconMdiModule, MzSidenavModule, MzModalModule, MzNavbarModule } from 'ng2-materialize';
import { MalihuScrollbarModule } from 'ngx-malihu-scrollbar';
import { MarkdownModule } from 'ngx-markdown';
import { LayoutComponent } from './layout.component';

@NgModule({
    imports: [
        CommonModule,
        LayoutRoutingModule,
        MalihuScrollbarModule.forRoot(),
        MzButtonModule,
        MzIconMdiModule,
        MzSidenavModule,
        MarkdownModule.forRoot(),
        MzModalModule,
        MzNavbarModule
    ],
    declarations: [LayoutComponent, HeaderComponent, SidebarComponent, HeaderComponent]
})

export class LayoutModule {}
