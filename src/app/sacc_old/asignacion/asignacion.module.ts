import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AsignacionRoutingModule } from './asignacion-routing.module';
import { AsignacionComponent } from './asignacion.component';

@NgModule({
    imports: [
        CommonModule,
        AsignacionRoutingModule
    ],
    declarations: [
        AsignacionComponent
    ]
})
export class AsignacionModule {}
