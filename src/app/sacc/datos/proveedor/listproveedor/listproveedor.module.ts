import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListproveedorComponent } from './listproveedor.component';
import { ListproveedorRoutingModule } from './listproveedor-routing.module';

@NgModule({
    imports: [
        CommonModule,
        ListproveedorRoutingModule
    ],
    declarations: [ListproveedorComponent]
})

export class ListproveedorModule {}
