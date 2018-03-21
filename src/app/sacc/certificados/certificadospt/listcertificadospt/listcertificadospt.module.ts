import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListcertificadosptRoutingModule } from './listcertificadospt-routing.module';
import { ListcertificadosptComponent } from './listcertificadospt.component';

@NgModule({
    imports: [
        CommonModule,
        ListcertificadosptRoutingModule
    ],
    declarations: [ListcertificadosptComponent]
})

export class ListcertificadosptModule {}
