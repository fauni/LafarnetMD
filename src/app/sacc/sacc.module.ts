import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutModule } from '../layout/layout.module';
import { SaccRoutingModule } from './sacc-routing.module';
import { SaccComponent } from './sacc.component';

@NgModule({
    imports: [
        CommonModule,
        SaccRoutingModule,
        LayoutModule
    ],
    declarations: [SaccComponent]
})

export class SaccModule {}
