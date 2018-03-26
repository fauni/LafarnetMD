import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UniformidadRoutingModule } from './uniformidad-routing.module';
import { UniformidadComponent } from './uniformidad.component';

@NgModule({
    imports: [
        CommonModule,
        UniformidadRoutingModule
    ],
    declarations: [UniformidadComponent]
})

export class UniformidadModule {}
