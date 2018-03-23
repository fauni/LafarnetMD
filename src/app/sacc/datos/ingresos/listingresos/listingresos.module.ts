import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListingresosRoutingModule } from './listingresos-routing.module';
import { ListingresosComponent } from './listingresos.component';
import { MzModalModule,
     MzButtonModule,
     MzInputModule,
     MzCardModule,
     MzTextareaModule,
     MzDatepickerModule,
     MzSelectModule  } from 'ng2-materialize';
import { FormsModule } from '@angular/forms';

@NgModule({
    imports: [
        CommonModule,
        ListingresosRoutingModule,
        MzModalModule,
        MzButtonModule,
        FormsModule,
        MzInputModule,
        MzCardModule,
        MzTextareaModule,
        MzDatepickerModule,
        MzSelectModule
    ],
    declarations: [ListingresosComponent]
})
export class ListingresosModule {}
