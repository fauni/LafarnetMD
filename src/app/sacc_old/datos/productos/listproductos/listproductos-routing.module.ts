import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListproductosComponent } from './listproductos.component';

const routes: Routes = [
    {
        path: '',
        component: ListproductosComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ListproductosRoutingModule {}
