import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MzCardModule, MzIconMdiModule, MzBadgeModule, MzButtonModule, MzModalModule, MzToastService,
    MzDatepickerModule, MzInputModule, MzSelectModule, MzToastModule, MzTextareaModule, MzTooltipModule,
    MzSpinnerModule } from 'ng2-materialize';
import { ListsupocRoutingModule } from './listsupoc-routing.module';
import { ListsupocComponent } from './listsupoc.component';
import { SolicitudService } from '../../solicitud/solicitud.service';
import { OrdenService } from '../orden.service';
import { FormsModule } from '@angular/forms';
import { Ng2SearchPipeModule } from 'ng2-search-filter';


@NgModule({
    imports: [
        CommonModule,
        ListsupocRoutingModule,
        MzCardModule,
        MzIconMdiModule,
        MzBadgeModule,
        MzButtonModule,
        MzModalModule,
        MzDatepickerModule,
        MzInputModule,
        MzSelectModule,
        MzToastModule,
        MzTextareaModule,
        MzTooltipModule,
        FormsModule,
        Ng2SearchPipeModule,
        MzSpinnerModule
    ],
    declarations: [
        ListsupocComponent
    ],
    providers: [
        SolicitudService, MzToastService, OrdenService
    ]
})

export class ListsupocModule {}
