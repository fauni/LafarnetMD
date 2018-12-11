import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MzCardModule, MzIconMdiModule, MzBadgeModule,
    MzButtonModule, MzModalModule, MzDatepickerModule, MzInputModule, 
    MzSelectModule, MzToastService, MzToastModule } from 'ng2-materialize';
import { SolicitudService } from '../solicitud.service';
import { ListscabasRoutingModule } from './listscabas-routing.module';
import { ListscabasComponent } from './listscabas.component';

@NgModule({
    imports: [
        CommonModule,
        ListscabasRoutingModule,
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
        ListscabasComponent
    ],
    providers: [
        SolicitudService, MzToastService
    ]
})

export class ListscabasModule {}
