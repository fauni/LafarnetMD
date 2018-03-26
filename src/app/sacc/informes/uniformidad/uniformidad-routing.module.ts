import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UniformidadComponent } from './uniformidad.component';

const routes: Routes = [
    {
        path: '',
        component: UniformidadComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class UniformidadRoutingModule {}
