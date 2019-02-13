import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListingresosRoutingModule } from './listingresos-routing.module';
import { ListingresosComponent } from './listingresos.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { Ng2OrderModule } from 'ng2-order-pipe';
import { NgxPaginationModule } from 'ngx-pagination';
import { MzModalModule,
     MzButtonModule,
     MzInputModule,
     MzCardModule,
     MzTextareaModule,
     MzDatepickerModule,
     MzSelectModule,
    MzNavbarModule,
    MzParallaxModule,
    MzDropdownModule  } from 'ng2-materialize';
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
        MzSelectModule,
        MzNavbarModule,
        MzParallaxModule,
        MzDropdownModule,
        Ng2SearchPipeModule,
        Ng2OrderModule,
        NgxPaginationModule
    ],
    declarations: [ListingresosComponent]
})
export class ListingresosModule {}
