import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CertificadosComponent } from './certificados.component';
import { CertificadosRoutingModule } from './certificados-routing.module';




@NgModule({
    imports: [
        CommonModule,
        CertificadosRoutingModule,
    ],
    declarations: [
        CertificadosComponent
    ]
})
export class CertificadosModule {}
