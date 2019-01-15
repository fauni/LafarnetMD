import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MzCardModule, MzIconMdiModule, MzBadgeModule,
    MzButtonModule, MzModalModule, MzDatepickerModule, MzInputModule, 
    MzSelectModule, MzToastService, MzToastModule, MzTextareaModule, MzTooltipModule, MzSpinnerModule } from 'ng2-materialize';
import { SolicitudService } from '../solicitud.service';
import { ListscabasRoutingModule } from './listscabas-routing.module';
import { ListscabasComponent } from './listscabas.component';
import { FormsModule } from '@angular/forms';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

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
        MzToastModule,
        MzTextareaModule,
        MzTooltipModule,
        FormsModule,
        Ng2SearchPipeModule,
        MzSpinnerModule
    ],
    declarations: [
        ListscabasComponent
    ],
    providers: [
        SolicitudService, MzToastService
    ]
})

export class ListscabasModule {}
