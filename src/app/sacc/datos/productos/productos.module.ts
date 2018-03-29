import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductosRoutingModule } from './productos-routing.module';
import { ProductosComponent } from './productos.component';
import { ProductosService } from './productos.service';

@NgModule({
    imports: [
        CommonModule,
        ProductosRoutingModule
    ],
    declarations: [ProductosComponent],
    providers: [ProductosService]
})

export class ProductosModule {}
