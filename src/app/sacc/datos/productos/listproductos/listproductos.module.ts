import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListproductosComponent } from './listproductos.component';
import { ListproductosRoutingModule } from './listproductos-routing.module';

@NgModule({
    imports: [
        CommonModule,
        ListproductosRoutingModule
    ],
    declarations: [ListproductosComponent]
})

export class ListproductosModule {}
