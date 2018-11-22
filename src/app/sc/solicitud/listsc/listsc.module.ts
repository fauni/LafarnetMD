import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListscRoutingModule } from './listsc-routing.module';
import { ListscComponent } from './listsc.component';

@NgModule({
    imports: [
        CommonModule,
        ListscRoutingModule
    ],
    declarations: [
        ListscComponent
    ]
})

export class ListscModule {}
