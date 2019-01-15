import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListscsupRoutingModule } from './listscsup-routing.module';
import { ListscsupComponent } from './listscsup.component';
import { MzCardModule, MzIconMdiModule, MzBadgeModule,
    MzButtonModule, MzModalModule, MzDatepickerModule, MzInputModule, 
    MzSelectModule, MzToastService, MzToastModule, MzTextareaModule, MzTooltipModule, MzSpinnerModule } from 'ng2-materialize';
import { SolicitudService } from '../solicitud.service';
import { FormsModule } from '@angular/forms';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

@NgModule({
    imports: [
        CommonModule,
        ListscsupRoutingModule,
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
        ListscsupComponent
    ],
    providers: [
        SolicitudService, MzToastService
    ]
})

export class ListscsupModule {}
