import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetailanalistaRoutingModule } from './detailanalista-routing.module';
import { DetailanalistaComponent } from './detailanalista.component';
import { MzParallaxModule,
    MzModalModule,
    MzIconMdiModule,
    MzButtonModule,
    MzInputModule,
    MzNavbarModule,
    MzDropdownModule } from 'ng2-materialize';
import { FormsModule } from '@angular/forms';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { Ng2OrderModule } from 'ng2-order-pipe';
import { NgxPaginationModule } from 'ngx-pagination';
import { MzCardModule, } from 'ng2-materialize';
import { SimpleNotificationsModule } from 'angular2-notifications';

@NgModule({
    imports: [
        CommonModule,
        DetailanalistaRoutingModule,
        Ng2SearchPipeModule,
        Ng2OrderModule,
        NgxPaginationModule,
        MzNavbarModule,
        MzDropdownModule,
        MzParallaxModule,
        MzModalModule,
        MzIconMdiModule,
        MzButtonModule,
        MzInputModule,
        MzCardModule,
        FormsModule,
        SimpleNotificationsModule
    ],
    declarations: [DetailanalistaComponent]
})

export class DetailanalistaModule {
}
