import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AsignacionmpRoutingModule } from './asignacionmp-routing.module';
import { AsignacionmpComponent } from './asignacionmp.component';
import { ProductosService } from '../../datos/productos/productos.service';
import { MzToastService } from '../../../../../node_modules/ng2-materialize';

@NgModule({
    imports: [
        CommonModule,
        AsignacionmpRoutingModule
    ],
    declarations: [AsignacionmpComponent],
    providers: [ProductosService, MzToastService]
})

export class AsignacionmpModule {}
