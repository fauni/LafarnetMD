import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetailasignacionptRoutingModule } from './detailasignacionpt-routing.module';
import { DetailasignacionptComponent } from './detailasignacionpt.component';
import { MzParallaxModule,
    MzModalModule,
    MzIconMdiModule,
    MzButtonModule,
    MzInputModule,
    MzNavbarModule,
    MzDropdownModule, 
    MzTabModule,
    MzSpinnerModule} from 'ng2-materialize';
import { FormsModule } from '@angular/forms';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { Ng2OrderModule } from 'ng2-order-pipe';
import { NgxPaginationModule } from 'ngx-pagination';
import { MzCardModule, } from 'ng2-materialize';
import { SimpleNotificationsModule } from 'angular2-notifications';
import { AsignacionService } from '../../asignacion.service';

@NgModule({
    imports: [
        CommonModule,
        DetailasignacionptRoutingModule,
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
        MzTabModule,
        FormsModule,
        MzSpinnerModule,
        SimpleNotificationsModule
    ],
    declarations: [DetailasignacionptComponent],
    providers: [AsignacionService]
})

export class DetailasignacionptModule {
}
