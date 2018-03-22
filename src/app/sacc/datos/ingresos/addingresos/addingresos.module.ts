import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddingresosRoutingModule } from './addingresos-routing.module';
import { AddingresosComponent } from './addingresos.component';

@NgModule({
    imports: [
        CommonModule,
        AddingresosRoutingModule
    ],
    declarations: [AddingresosComponent]
})
export class AddingresosModule {}
