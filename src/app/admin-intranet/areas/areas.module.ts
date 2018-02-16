import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AreasRoutingModule } from './areas-routing.module';
import { AreasComponent } from './areas.component';

@NgModule({
    imports: [
        CommonModule,
        AreasRoutingModule
    ],
    declarations: [
        AreasComponent
    ]
})
export class AreasModule {}
