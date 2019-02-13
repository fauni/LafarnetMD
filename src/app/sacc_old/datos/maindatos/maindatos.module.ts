import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaindatosRoutingModule } from './maindatos-routing.module';
import { MaindatosComponent } from './maindatos.component';
import {
    MzNavbarModule,
    MzTabModule,
    MzCheckboxModule,
    MzCardModule,
    MzButtonModule,
    MzIconModule,
    MzIconMdiModule
} from 'ng2-materialize';
import { AnalistasService } from '../analista/analista.service';


@NgModule({
    imports: [
        CommonModule,
        MaindatosRoutingModule,
        MzNavbarModule,
        MzTabModule,
        MzCheckboxModule,
        MzCardModule,
        MzButtonModule,
        MzIconModule,
        MzIconMdiModule
    ],
    declarations: [MaindatosComponent],
    providers: [AnalistasService]
})

export class MaindatosModule {}
