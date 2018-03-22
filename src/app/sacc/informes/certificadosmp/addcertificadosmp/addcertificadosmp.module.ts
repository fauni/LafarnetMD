import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddcertificadosmpComponent } from './addcertificadosmp.component';
import { AddcertificadosmpRoutingModule } from './addcertificadosmp-routing.module';
import { MzInputModule, MzCardModule } from 'ng2-materialize';
import { FormsModule } from '@angular/forms';

@NgModule({
    imports: [
        CommonModule,
        AddcertificadosmpRoutingModule,
        MzInputModule,
        MzCardModule,
        FormsModule
    ],
    declarations: [AddcertificadosmpComponent]
})

export class AddcertificadosmpModule {}
