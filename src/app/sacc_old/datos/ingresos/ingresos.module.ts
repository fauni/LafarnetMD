import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IngresosRoutingModule } from './ingresos-routing.module';
import { IngresosComponent } from './ingresos.component';
import { IngresosService } from './ingresos.service';

@NgModule({
    imports: [
        CommonModule,
        IngresosRoutingModule
    ],
    declarations: [IngresosComponent],
    providers: [IngresosService]
})

export class IngresosModule {}
