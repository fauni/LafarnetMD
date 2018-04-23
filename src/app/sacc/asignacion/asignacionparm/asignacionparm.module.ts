import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AsignacionparmRoutingModule } from './asignacionparm-routing.module';
import { AsignacionparmComponent } from './asignacionparm.component';
import { ClasificacionService } from '../clasificacion.service';
import {ClasificacionCaracteristicaService} from './clasificacion_caracteristica.service';
import {CaracteristicasService} from '../caracteristicas.service';
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
    MzSelectModule,
    MzCollapsibleModule
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
        FormsModule,
        MzCollapsibleModule
    ],
    declarations: [AsignacionparmComponent],
    providers: [ClasificacionService, ClasificacionCaracteristicaService, CaracteristicasService]
})

export class AsignacionparmModule {}
