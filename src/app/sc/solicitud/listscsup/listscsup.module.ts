import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListscsupRoutingModule } from './listscsup-routing.module';
import { ListscsupComponent } from './listscsup.component';
import { MzCardModule, MzIconMdiModule, MzBadgeModule,
    MzButtonModule, MzModalModule, MzDatepickerModule, MzInputModule, 
    MzSelectModule, MzToastService, MzToastModule } from 'ng2-materialize';
import { SolicitudService } from '../solicitud.service';

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
        MzToastModule
    ],
    declarations: [
        ListscsupComponent
    ],
    providers: [
        SolicitudService, MzToastService
    ]
})

export class ListscsupModule {}
