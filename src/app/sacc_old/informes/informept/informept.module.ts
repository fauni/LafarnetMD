import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InformeptRoutingModule } from './informept-routing.module';
import { InformeptComponent } from './informept.component';

@NgModule({
    imports: [
        CommonModule,
        InformeptRoutingModule
    ],
    declarations: [InformeptComponent]
})

export class InformeptModule {}
