import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListcertificadosmpComponent } from './listcertificadosmp.component';
import { ListcertificadosmpRoutingModule } from './listcertificadosmp-routing.module';

@NgModule({
    imports: [
        CommonModule,
        ListcertificadosmpRoutingModule
    ],
    declarations: [ListcertificadosmpComponent]
})

export class ListcertificadosmpModule {}
