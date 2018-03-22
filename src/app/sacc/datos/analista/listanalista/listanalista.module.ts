import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListanalistaRoutingModule } from './listanalista-routing.module';
import { ListanalistaComponent } from './listanalista.component';

@NgModule({
    imports: [
        CommonModule,
        ListanalistaRoutingModule
    ],
    declarations: [ListanalistaComponent]
})

export class ListanalistaModule {}
