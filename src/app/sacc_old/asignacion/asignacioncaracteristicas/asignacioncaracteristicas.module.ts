import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AsignacionCaracteristicasRoutingModule } from './asignacioncaracteristicas-routing.module';
import { AsignacionCaracteristicasComponent } from './asignacioncaracteristicas.component';
// import { IngresosService } from './ingresos.service';

@NgModule({
    imports: [
        CommonModule,
        AsignacionCaracteristicasRoutingModule
    ],
    declarations: [AsignacionCaracteristicasComponent],
   // providers: [IngresosService]
})

export class AsignacionCaracteristicasModule { }
