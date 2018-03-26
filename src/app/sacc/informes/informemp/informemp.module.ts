import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InformempRoutingModule } from './informemp-routing.module';
import { InformempComponent } from './informemp.component';

@NgModule({
    imports: [
        CommonModule,
        InformempRoutingModule
    ],
    declarations: [InformempComponent]
})

export class InformempModule {}
