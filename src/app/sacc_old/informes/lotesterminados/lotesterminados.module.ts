import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LotesterminadosRoutingModule } from './lotesterminados-routing.module';
import { LotesterminadosComponent } from './lotesterminados.component';

@NgModule({
    imports: [
        CommonModule,
        LotesterminadosRoutingModule
    ],
    declarations: [LotesterminadosComponent]
})

export class LotesterminadosModule {}
