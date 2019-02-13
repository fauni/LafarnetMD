import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddanalistaRoutingModule } from './addanalista-routing.module';
import { AddanalistaComponent } from './addanalista.component';
import { MzParallaxModule,
    MzModalModule,
    MzIconMdiModule,
    MzButtonModule,
    MzInputModule,
    MzNavbarModule,
    MzDropdownModule,
    MzSelectModule} from 'ng2-materialize';
import { FormsModule } from '@angular/forms';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { Ng2OrderModule } from 'ng2-order-pipe';
import { NgxPaginationModule } from 'ngx-pagination';
import { MzCardModule } from 'ng2-materialize';
import { Ng2CompleterModule } from 'ng2-completer';
import { SimpleNotificationsModule } from 'angular2-notifications';

@NgModule({
    imports: [
        CommonModule,
        AddanalistaRoutingModule,
        Ng2CompleterModule,
        Ng2SearchPipeModule,
        Ng2OrderModule,
        NgxPaginationModule,
        MzNavbarModule,
        MzDropdownModule,
        MzSelectModule,
        MzParallaxModule,
        MzModalModule,
        MzIconMdiModule,
        MzButtonModule,
        MzInputModule,
        MzCardModule,
        FormsModule,
        SimpleNotificationsModule
    ],
    declarations: [AddanalistaComponent],
})
export class AddanalistaModule {}
