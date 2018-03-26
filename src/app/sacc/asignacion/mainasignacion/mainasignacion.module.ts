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
    declarations: [MainasignacionComponent]
})

export class MainasignacionModule {}
