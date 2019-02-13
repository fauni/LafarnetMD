import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CertificadosptRoutingModule } from './certificadospt-routing.module';
import { CertificadosptComponent } from './certificadospt.component';

@NgModule({
    imports: [
        CommonModule,
        CertificadosptRoutingModule
    ],
    declarations: [CertificadosptComponent],
})

export class CertificadosptModule {}
