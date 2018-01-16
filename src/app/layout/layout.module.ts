import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutRoutingModule } from './layout-routing.module';

import { MzButtonModule, MzIconMdiModule, MzSidenavModule, MzModalModule, MzNavbarModule } from 'ng2-materialize';
import { MalihuScrollbarModule } from 'ngx-malihu-scrollbar';
import { MarkdownModule } from 'ngx-markdown';
import { LayoutComponent } from './layout.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { NgxSmartModalModule, NgxSmartModalService } from 'ngx-smart-modal';
import { HeaderComponent } from './components/header/header.component';

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
        MzNavbarModule,
        NgxSmartModalModule
    ],
    declarations: [LayoutComponent, SidebarComponent, HeaderComponent],
    exports: [ HeaderComponent, SidebarComponent ],
    providers: [ NgxSmartModalService ]
})

export class LayoutModule {}
