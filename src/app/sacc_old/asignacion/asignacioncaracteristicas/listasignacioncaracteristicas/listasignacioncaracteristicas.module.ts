import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListAsignacionCaracteristicasRoutingModule } from './listasignacioncaracteristicas-routing.module';
import { ListAsignacionCaracteristicasComponent } from './listasignacioncaracteristicas.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { Ng2OrderModule } from 'ng2-order-pipe';
import { NgxPaginationModule } from 'ngx-pagination';
import {CaracteristicasService} from '../../caracteristicas.service';
import { MzModalModule,
     MzButtonModule,
     MzInputModule,
     MzCardModule,
     MzTextareaModule,
     MzDatepickerModule,
     MzSelectModule,
    MzNavbarModule,
    MzParallaxModule,
    MzDropdownModule,
    MzCollapsibleModule} from 'ng2-materialize';
import { FormsModule } from '@angular/forms';
import { NotificationsService, SimpleNotificationsModule } from 'angular2-notifications';

@NgModule({
    imports: [
        CommonModule,
        ListAsignacionCaracteristicasRoutingModule,
        MzModalModule,
        MzButtonModule,
        FormsModule,
        MzInputModule,
        MzCardModule,
        MzTextareaModule,
        MzDatepickerModule,
        MzSelectModule,
        MzNavbarModule,
        MzParallaxModule,
        MzDropdownModule,
        Ng2SearchPipeModule,
        Ng2OrderModule,
        NgxPaginationModule,
        MzCollapsibleModule,
        SimpleNotificationsModule
    ],
    declarations: [ListAsignacionCaracteristicasComponent],
    providers: [CaracteristicasService, NotificationsService]
})
export class ListAsignacionCaracteristicasModule {}
