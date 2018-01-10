import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarioRoutingModule } from './calendario-routing.module';
import { CalendarioComponent } from './calendario.component';


@NgModule({
    imports: [
        CommonModule,
        CalendarioRoutingModule
    ],
    declarations: [
        CalendarioComponent
    ]
})
export class CalendarioModule {}
