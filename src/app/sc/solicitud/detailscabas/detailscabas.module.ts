import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetailscabasRoutingModule } from './detailscabas-routing.module';
import { DetailscabasComponent } from './detailscabas.component';
import { MzCardModule, MzButtonModule, MzIconModule, MzNavbarModule, MzInputModule, MzSelectModule, MzDatepickerModule,
    MzIconMdiModule, MzTextareaModule, MzModalModule, MzToastService, MzToastModule, MzValidationModule, MzCollectionModule, MzBadgeModule, MzSpinnerModule } from 'ng2-materialize';
import { SolicitudService } from '../solicitud.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { Globals } from '../../../globals';

@NgModule({
    imports: [
        CommonModule,
        DetailscabasRoutingModule,
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
        DetailscabasComponent
    ],
    providers: [
        SolicitudService, MzToastService, Globals
    ]
})

export class DetailscabasModule {}
