import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetailscRoutingModule } from './detailsc-routing.module';
import { DetailscComponent } from './detailsc.component';
import { MzCardModule, MzButtonModule, MzIconModule, MzNavbarModule, MzInputModule, MzSelectModule, MzDatepickerModule,
    MzIconMdiModule, MzTextareaModule, MzModalModule, MzToastService, MzToastModule, MzValidationModule, MzCollectionModule, MzBadgeModule, MzSpinnerModule } from 'ng2-materialize';
import { SolicitudService } from '../solicitud.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { Globals } from '../../../globals';

@NgModule({
    imports: [
        CommonModule,
        DetailscRoutingModule,
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
        ReactiveFormsModule,
        MzValidationModule,
        NgSelectModule,
        MzCollectionModule,
        MzBadgeModule,
        MzSpinnerModule

    ],
    declarations: [
        DetailscComponent
    ],
    providers: [
        SolicitudService, MzToastService, Globals
    ]
})

export class DetailscModule {}
