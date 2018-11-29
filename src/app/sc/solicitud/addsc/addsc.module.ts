import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddscRoutingModule } from './addsc-routing.module';
import { AddscComponent } from './addsc.component';
import { MzCardModule, MzButtonModule, MzIconModule, MzNavbarModule, MzInputModule, MzSelectModule, MzDatepickerModule,
    MzIconMdiModule, MzTextareaModule, MzModalModule, MzToastService, MzToastModule } from 'ng2-materialize';
import { SolicitudService } from '../solicitud.service';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';

@NgModule({
    imports: [
        CommonModule,
        AddscRoutingModule,
        MzCardModule,
        MzButtonModule,
        MzIconModule,
        MzIconMdiModule,
        MzNavbarModule,
        MzInputModule,
        MzSelectModule,
        MzDatepickerModule,
        MzTextareaModule,
        MzModalModule,
        MzToastModule,
        FormsModule,
        NgSelectModule
    ],
    declarations: [
        AddscComponent
    ],
    providers: [
        SolicitudService, MzToastService
    ]
})

export class AddscModule {}
