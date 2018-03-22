import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductosComponent } from './productos.component';

const routes: Routes = [
    {
        path: '',
        component: ProductosComponent,
        children: [
            { path: '', redirectTo: 'add' },
            { path: 'add', loadChildren: './addproductos/addproductos.module#AddproductosModule' },
            { path: 'list', loadChildren: './listproductos/listproductos.module#ListproductosModule' }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ProductosRoutingModule {}
