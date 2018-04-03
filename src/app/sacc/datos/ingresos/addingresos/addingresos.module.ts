import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddingresosRoutingModule } from './addingresos-routing.module';
import { AddingresosComponent } from './addingresos.component';
import { MzModalModule,
    MzButtonModule,
    MzInputModule,
    MzCardModule,
    MzDatepickerModule,
    MzSelectModule,
    MzParallaxModule,
    MzTextareaModule,
    MzToastModule,
    MzToastService} from 'ng2-materialize';
import { Ng2CompleterModule } from 'ng2-completer';
import { FormsModule } from '@angular/forms';
import { ProductosService } from '../../productos/productos.service';
import { ProveedoresService } from '../../proveedor/proveedor.service';
import { IngresosService} from '../../ingresos/ingresos.service';
import { Ingresos } from '../ingresos';
@NgModule({
    imports: [
        CommonModule,
        AddingresosRoutingModule,
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
        MzToastModule
    ],
    declarations: [AddingresosComponent],
    providers: [ProductosService, ProveedoresService, IngresosService]

})
export class AddingresosModule {}
