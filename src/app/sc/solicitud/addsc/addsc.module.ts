import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddscRoutingModule } from './addsc-routing.module';
import { AddscComponent } from './addsc.component';
import { MzCardModule, MzButtonModule, MzIconModule, MzNavbarModule, MzInputModule, MzSelectModule, MzDatepickerModule,
    MzIconMdiModule, MzTextareaModule, MzModalModule } from 'ng2-materialize';

@NgModule({
    imports: [
        CommonModule,
        AddscRoutingModule,
        MzCardModule,
        MzButtonModule,
        MzIconModule,
        MzIconMdiModule,
        MzNavbarModule,
        MzInputModule,
        MzSelectModule,
        MzDatepickerModule,
        MzTextareaModule,
        MzModalModule
    ],
    declarations: [
        AddscComponent
    ]
})

export class AddscModule {}
