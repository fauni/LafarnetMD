import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormTHRProcesoRoutingModule } from './formTHRProceso-routing.module';
import { FormTHRProcesoComponent } from './formTHRProceso.component';
import { FormsModule } from '@angular/forms';
import { MzParallaxModule, MzSpinnerModule, MzCardModule,
    MzSelectModule, MzInputModule, MzRadioButtonModule, MzCheckboxModule, MzButtonModule } from 'ng2-materialize';
import { SeccionesService } from '../../admin-intranet/secciones/secciones.service';
import { EtapasProcesoService } from '../etapasproceso.service';
import { PpService } from '../pp.service';

@NgModule({
    imports: [
        CommonModule,
        FormTHRProcesoRoutingModule,
        FormsModule,
        MzParallaxModule,
        MzSpinnerModule,
        MzCardModule,
        MzSelectModule,
        MzInputModule,
        MzRadioButtonModule,
        MzCheckboxModule,
        MzButtonModule
    ],
    declarations: [FormTHRProcesoComponent],
    providers: [SeccionesService, EtapasProcesoService, PpService]
})

export class FormTHRProcesoModule {}
