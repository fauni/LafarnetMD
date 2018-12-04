import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListscRoutingModule } from './listsc-routing.module';
import { ListscComponent } from './listsc.component';
import { MzCardModule, MzIconMdiModule, MzBadgeModule,
    MzButtonModule, MzModalModule, MzDatepickerModule, MzInputModule, MzSelectModule, MzToastService, MzToastModule } from 'ng2-materialize';
import { SolicitudService } from '../solicitud.service';

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
        MzToastModule
    ],
    declarations: [
        ListscComponent
    ],
    providers: [
        SolicitudService, MzToastService
    ]
})

export class ListscModule {}
