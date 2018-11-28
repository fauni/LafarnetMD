import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MzParallaxModule, MzCardModule } from 'ng2-materialize';
import { OrdenRoutingModule } from './orden-routing.module';
import { OrdenComponent } from './orden.component';

@NgModule({
    imports: [
        CommonModule,
        OrdenRoutingModule,
        MzParallaxModule,
        MzCardModule
    ],
    declarations: [
        OrdenComponent
    ]
})

export class OrdenModule {}
