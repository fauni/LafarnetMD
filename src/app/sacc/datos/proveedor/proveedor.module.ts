import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProveedorRoutingModule } from './proveedor-routing.module';
import { ProveedorComponent } from './proveedor.component';
import { ProveedoresService } from './proveedor.service';

@NgModule({
    imports: [
        CommonModule,
        ProveedorRoutingModule
    ],
    declarations: [ProveedorComponent],
    providers: [ProveedoresService]
})

export class ProveedorModule {}
