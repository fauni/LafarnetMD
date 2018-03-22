import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CertificadosmpRoutingModule } from './certificadosmp-routing.module';
import { CertificadosmpComponent } from './certificadosmp.component';

@NgModule({
    imports: [
        CommonModule,
        CertificadosmpRoutingModule
    ],
    declarations: [CertificadosmpComponent]
})

export class CertificadosmpModule {}
