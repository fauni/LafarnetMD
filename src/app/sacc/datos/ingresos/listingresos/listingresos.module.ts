import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListingresosRoutingModule } from './listingresos-routing.module';
import { ListingresosComponent } from './listingresos.component';

@NgModule({
    imports: [
        CommonModule,
        ListingresosRoutingModule
    ],
    declarations: [ListingresosComponent]
})
export class ListingresosModule {}
