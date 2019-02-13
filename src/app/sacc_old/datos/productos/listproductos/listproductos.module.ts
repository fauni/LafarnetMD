import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListproductosComponent } from './listproductos.component';
import { ListproductosRoutingModule } from './listproductos-routing.module';
import { MzParallaxModule,
    MzModalModule,
    MzIconMdiModule,
    MzButtonModule,
    MzInputModule,
    MzNavbarModule,
    MzDropdownModule } from 'ng2-materialize';
import { FormsModule } from '@angular/forms';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { Ng2OrderModule } from 'ng2-order-pipe';
import { NgxPaginationModule } from 'ngx-pagination';


@NgModule({
    imports: [
        CommonModule,
        ListproductosRoutingModule,
        Ng2SearchPipeModule,
        Ng2OrderModule,
        NgxPaginationModule,
        MzNavbarModule,
        MzDropdownModule,
        MzParallaxModule,
        MzModalModule,
        MzIconMdiModule,
        MzButtonModule,
        MzInputModule,
        FormsModule
    ],
    declarations: [ListproductosComponent]
})

export class ListproductosModule {}
