import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AsignacionptRoutingModule } from './asignacionpt-routing.module';
import { AsignacionptComponent } from './asignacionpt.component';

@NgModule({
    imports: [
        CommonModule,
        AsignacionptRoutingModule
    ],
    declarations: [AsignacionptComponent]
})

export class AsignacionptModule {}
