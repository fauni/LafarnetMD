import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CertificadosComponent } from './certificados.component';
import { CertificadosRoutingModule } from './certificados-routing.module';
import { MzNavbarModule, MzTabModule, MzCheckboxModule } from 'ng2-materialize';



@NgModule({
    imports: [
        CommonModule,
        CertificadosRoutingModule,
        MzNavbarModule,
        MzTabModule,
        MzCheckboxModule
    ],
    declarations: [
        CertificadosComponent
    ]
})
export class CertificadosModule {}
