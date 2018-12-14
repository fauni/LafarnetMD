import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListscRoutingModule } from './listsc-routing.module';
import { ListscComponent } from './listsc.component';
import { MzCardModule, MzIconMdiModule, MzBadgeModule,
    MzButtonModule, MzModalModule, MzDatepickerModule, MzInputModule, MzSelectModule, MzToastService, MzToastModule, MzTextareaModule } from 'ng2-materialize';
import { SolicitudService } from '../solicitud.service';
import { FormsModule } from '@angular/forms';

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
        FormsModule
    ],
    declarations: [
        ListscComponent
    ],
    providers: [
        SolicitudService, MzToastService
    ]
})

export class ListscModule {}
