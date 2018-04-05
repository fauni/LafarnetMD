import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VeringresoRoutingModule } from './veringreso-routing.module';
import { VeringresoComponent } from './veringreso.component';
import { MzModalModule,
    MzButtonModule,
    MzInputModule,
    MzCardModule,
    MzDatepickerModule,
    MzSelectModule,
    MzParallaxModule,
    MzTextareaModule,
    MzToastModule,
    MzToastService,
    MzSpinnerModule} from 'ng2-materialize';
import { Ng2CompleterModule } from 'ng2-completer';
import { FormsModule } from '@angular/forms';
import { ProductosService } from '../../productos/productos.service';
import { ProveedoresService } from '../../proveedor/proveedor.service';
import { IngresosService} from '../../ingresos/ingresos.service';
import { DetalleIngresosService } from '../detalleingresos.service';
import { Ingresos } from '../ingresos';
@NgModule({
    imports: [
        CommonModule,
        VeringresoRoutingModule,
        MzModalModule,
        MzButtonModule,
        FormsModule,
        MzInputModule,
        MzCardModule,
        MzDatepickerModule,
        MzSelectModule,
        Ng2CompleterModule,
        MzParallaxModule,
        MzTextareaModule,
        MzToastModule,
        MzSpinnerModule
    ],
    declarations: [VeringresoComponent],
    providers: [ProductosService, ProveedoresService, IngresosService, DetalleIngresosService]

})
export class VeringresoModule {}
