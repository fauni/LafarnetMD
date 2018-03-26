import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AsignacionmpRoutingModule } from './asignacionmp-routing.module';
import { AsignacionmpComponent } from './asignacionmp.component';

@NgModule({
    imports: [
        CommonModule,
        AsignacionmpRoutingModule
    ],
    declarations: [AsignacionmpComponent]
})

export class AsignacionmpModule {}
