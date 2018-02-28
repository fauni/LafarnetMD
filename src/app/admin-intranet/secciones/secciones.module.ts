import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SeccionesRoutingModule } from './secciones-routing.module';
import { SeccionesComponent } from './secciones.component';

@NgModule({
    imports: [
        CommonModule,
        SeccionesRoutingModule
    ],
    declarations: [
        SeccionesComponent
    ]
})
export class SeccionesModule {}
