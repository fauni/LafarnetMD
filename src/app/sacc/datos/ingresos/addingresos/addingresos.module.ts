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
    MzParallaxModule } from 'ng2-materialize';
import { Ng2CompleterModule } from 'ng2-completer';
import { FormsModule } from '@angular/forms';
import { ProductosService } from '../../productos/productos.service';
import { ProveedoresService } from '../../proveedor/proveedor.service';
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
        MzParallaxModule
    ],
    declarations: [AddingresosComponent],
    providers: [ProductosService, ProveedoresService]

})
export class AddingresosModule {}
