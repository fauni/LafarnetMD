import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddanalistaRoutingModule } from './addanalista-routing.module';
import { AddanalistaComponent } from './addanalista.component';

@NgModule({
    imports: [
        CommonModule,
        AddanalistaRoutingModule
    ],
    declarations: [AddanalistaComponent]
})
export class AddanalistaModule {}
