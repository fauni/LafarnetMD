import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AsignacionptRoutingModule } from './asignacionpt-routing.module';
import { AsignacionptComponent } from './asignacionpt.component';
import { ProductosService } from '../../datos/productos/productos.service';
import { MzToastService } from '../../../../../node_modules/ng2-materialize';

@NgModule({
    imports: [
        CommonModule,
        AsignacionptRoutingModule
    ],
    declarations: [AsignacionptComponent],
    providers: [ProductosService, MzToastService]
})

export class AsignacionptModule {}
