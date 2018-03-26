import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainsaccRoutingModule } from './mainsacc-routing.module';
import { MainsaccComponent } from './mainsacc.component';

@NgModule({
    imports: [
        CommonModule,
        MainsaccRoutingModule
    ],
    declarations: [
        MainsaccComponent
    ]
})
export class MainsaccModule {}
