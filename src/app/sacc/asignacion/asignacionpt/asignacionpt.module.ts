import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AsignacionptRoutingModule } from './asignacionpt-routing.module';
import { AsignacionptComponent } from './asignacionpt.component';
import { ProductosService } from '../../datos/productos/productos.service';

@NgModule({
    imports: [
        CommonModule,
        AsignacionptRoutingModule
    ],
    declarations: [AsignacionptComponent],
    providers: [ProductosService]
})

export class AsignacionptModule {}
