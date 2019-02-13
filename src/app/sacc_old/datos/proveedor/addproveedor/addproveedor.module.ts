import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddproveedorComponent } from './addproveedor.component';
import { AddproveedorRoutingModule } from './addproveedor-routing.module';
import { MzInputModule, MzCardModule } from 'ng2-materialize';
import { FormsModule } from '@angular/forms';

@NgModule({
    imports: [
        CommonModule,
        AddproveedorRoutingModule,
        MzInputModule,
        MzCardModule,
        FormsModule
    ],
    declarations: [AddproveedorComponent]
})

export class AddproveedorModule {}
