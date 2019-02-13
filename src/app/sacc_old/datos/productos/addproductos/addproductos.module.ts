import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddproductosComponent } from './addproductos.component';
import { AddproductosRoutingModule } from './addproductos-routing.module';
import { MzInputModule, MzCardModule } from 'ng2-materialize';
import { FormsModule } from '@angular/forms';

@NgModule({
    imports: [
        CommonModule,
        AddproductosRoutingModule,
        MzInputModule,
        MzCardModule,
        FormsModule
    ],
    declarations: [AddproductosComponent]
})

export class AddproductosModule {}
