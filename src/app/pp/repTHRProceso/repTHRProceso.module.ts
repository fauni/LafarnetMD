import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RepTHRProcesoRoutingModule } from './repTHRProceso-routing.module';
import { RepTHRProcesoComponent } from './repTHRProceso.component';

@NgModule({
    imports: [
        CommonModule,
        RepTHRProcesoRoutingModule
    ],
    declarations: [RepTHRProcesoComponent]
})

export class RepTHRProcesoModule {}
