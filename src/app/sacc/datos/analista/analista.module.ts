import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnalistaRoutingModule } from './analista-routing.module';
import { AnalistaComponent } from './analista.component';

@NgModule({
    imports: [
        CommonModule,
        AnalistaRoutingModule
    ],
    declarations: [AnalistaComponent]
})

export class AnalistaModule {}
