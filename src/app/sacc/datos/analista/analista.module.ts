import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnalistaRoutingModule } from './analista-routing.module';
import { AnalistaComponent } from './analista.component';
import { AnalistasService } from './analista.service';
import { NotificationsService } from 'angular2-notifications';

@NgModule({
    imports: [
        CommonModule,
        AnalistaRoutingModule
    ],
    declarations: [AnalistaComponent],
    providers: [AnalistasService, NotificationsService]
})

export class AnalistaModule {}
