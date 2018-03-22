import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaincertificadosRoutingModule } from './maincertificados-routing.module';
import { MaincertificadosComponent } from './maincertificados.component';
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
        MaincertificadosRoutingModule,
        MzNavbarModule,
        MzTabModule,
        MzCheckboxModule,
        MzCardModule,
        MzButtonModule,
        MzIconModule,
        MzIconMdiModule
    ],
    declarations: [MaincertificadosComponent]
})

export class MaincertificadosModule {}
