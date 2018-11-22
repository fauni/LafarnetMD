import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MzParallaxModule, MzCardModule } from 'ng2-materialize';
import { SolicitudRoutingModule } from './solicitud-routing.module';
import { SolicitudComponent } from './solicitud.component';

@NgModule({
    imports: [
        CommonModule,
        SolicitudRoutingModule,
        MzParallaxModule,
        MzCardModule
    ],
    declarations: [
        SolicitudComponent
    ]
})

export class SolicitudModule {}
