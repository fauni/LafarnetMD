import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListscRoutingModule } from './listsc-routing.module';
import { ListscComponent } from './listsc.component';
import { MzCardModule, MzIconMdiModule, MzBadgeModule,
    MzButtonModule, MzModalModule, MzDatepickerModule, MzInputModule, MzSelectModule, MzToastService, MzToastModule, MzTextareaModule, MzTooltipModule } from 'ng2-materialize';
import { SolicitudService } from '../solicitud.service';
import { FormsModule } from '@angular/forms';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

@NgModule({
    imports: [
        CommonModule,
        ListscRoutingModule,
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
        FormsModule,
        Ng2SearchPipeModule,
        MzTooltipModule
    ],
    declarations: [
        ListscComponent
    ],
    providers: [
        SolicitudService, MzToastService
    ]
})

export class ListscModule {}
