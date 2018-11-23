import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListscRoutingModule } from './listsc-routing.module';
import { ListscComponent } from './listsc.component';
import { MzCardModule, MzIconMdiModule, MzBadgeModule,
    MzButtonModule, MzModalModule, MzDatepickerModule, MzInputModule, MzSelectModule } from 'ng2-materialize';

@NgModule({
    imports: [
        CommonModule,
        ListscRoutingModule,
        MzCardModule,
        MzIconMdiModule,
        MzBadgeModule,
        MzButtonModule,
        MzModalModule,
        MzDatepickerModule,
        MzInputModule,
        MzSelectModule
    ],
    declarations: [
        ListscComponent
    ]
})

export class ListscModule {}
