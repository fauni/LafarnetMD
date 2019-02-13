import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InformesRoutingModule } from './informes-routing.module';
import { InformesComponent } from './informes.component';

@NgModule({
    imports: [
        CommonModule,
        InformesRoutingModule
    ],
    declarations: [
        InformesComponent
    ]
})
export class InformesModule {}
