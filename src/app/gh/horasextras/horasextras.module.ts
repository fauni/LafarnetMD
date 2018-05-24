import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HorasextrasComponent } from './horasextras.component';
import { HorasextrasRoutingModule } from './horasextras-routing.module';

@NgModule({
    imports: [
        CommonModule,
        HorasextrasRoutingModule
    ],
    declarations: [HorasextrasComponent]
})

export class HorasextrasModule {}
