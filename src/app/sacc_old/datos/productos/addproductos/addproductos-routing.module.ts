import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddproductosComponent } from './addproductos.component';

const routes: Routes = [
    {
        path: '',
        component: AddproductosComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AddproductosRoutingModule {}
