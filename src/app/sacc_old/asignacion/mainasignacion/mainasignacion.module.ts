import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainasignacionRoutingModule } from './mainasignacion-routing.module';
import { MainasignacionComponent } from './mainasignacion.component';
import {
    MzNavbarModule,
    MzTabModule,
    MzCheckboxModule,
    MzCardModule,
    MzButtonModule,
    MzIconModule,
    MzIconMdiModule
} from 'ng2-materialize';
import { AnalistasService } from '../../datos/analista/analista.service';


@NgModule({
    imports: [
        CommonModule,
        MainasignacionRoutingModule,
        MzNavbarModule,
        MzTabModule,
        MzCheckboxModule,
        MzCardModule,
        MzButtonModule,
        MzIconModule,
        MzIconMdiModule
    ],
    declarations: [MainasignacionComponent],
    providers: [AnalistasService]
})

export class MainasignacionModule {}
