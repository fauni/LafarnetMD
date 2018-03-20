import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CertificadosComponent } from './certificados.component';
import { CertificadosRoutingModule } from './certificados-routing.module';
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
        CertificadosRoutingModule,
        MzNavbarModule,
        MzTabModule,
        MzCheckboxModule,
        MzCardModule,
        MzButtonModule,
        MzIconModule,
        MzIconMdiModule
    ],
    declarations: [
        CertificadosComponent
    ]
})
export class CertificadosModule {}
