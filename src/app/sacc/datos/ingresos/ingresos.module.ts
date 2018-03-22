import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IngresosRoutingModule } from './ingresos-routing.module';
import { IngresosComponent } from './ingresos.component';

@NgModule({
    imports: [
        CommonModule,
        IngresosRoutingModule
    ],
    declarations: [IngresosComponent]
})

export class IngresosModule {}
