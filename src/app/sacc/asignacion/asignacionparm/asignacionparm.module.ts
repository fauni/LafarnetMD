import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AsignacionparmRoutingModule } from './asignacionparm-routing.module';
import { AsignacionparmComponent } from './asignacionparm.component';
import { Clasificacion } from '../clasificacion';
import { ClasificacionService } from '../clasificacion.service';
import {
    MzNavbarModule,
    MzTabModule,
    MzCheckboxModule,
    MzCardModule,
    MzButtonModule,
    MzIconModule,
    MzIconMdiModule,
    MzParallaxModule,
    MzRadioButtonModule,
    MzSelectModule
} from 'ng2-materialize';
import {FormsModule} from '@angular/forms';


@NgModule({
    imports: [
        CommonModule,
        AsignacionparmRoutingModule,
        MzNavbarModule,
        MzTabModule,
        MzCheckboxModule,
        MzCardModule,
        MzButtonModule,
        MzIconModule,
        MzIconMdiModule,
        MzParallaxModule,
        MzRadioButtonModule,
        MzSelectModule,
        FormsModule
    ],
    declarations: [AsignacionparmComponent],
    providers: [ClasificacionService]
})

export class AsignacionparmModule {}
