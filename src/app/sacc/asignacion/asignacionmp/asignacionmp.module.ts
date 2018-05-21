import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AsignacionmpRoutingModule } from './asignacionmp-routing.module';
import { AsignacionmpComponent } from './asignacionmp.component';
import { ProductosService } from '../../datos/productos/productos.service';

@NgModule({
    imports: [
        CommonModule,
        AsignacionmpRoutingModule
    ],
    declarations: [AsignacionmpComponent],
    providers: [ProductosService]
})

export class AsignacionmpModule {}
