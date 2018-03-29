import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListproductosComponent } from './listproductos.component';
import { ListproductosRoutingModule } from './listproductos-routing.module';
import { MzParallaxModule, MzModalModule, MzIconMdiModule, MzButtonModule, MzInputModule } from 'ng2-materialize';
import { FormsModule } from '@angular/forms';


@NgModule({
    imports: [
        CommonModule,
        ListproductosRoutingModule,
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
