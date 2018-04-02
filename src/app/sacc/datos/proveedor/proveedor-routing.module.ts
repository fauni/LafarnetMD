import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProveedorComponent } from './proveedor.component';

const routes: Routes = [
    {
        path: '',
        component: ProveedorComponent,
        children: [
            { path: '', redirectTo: 'list' },
            { path: 'add', loadChildren: './addproveedor/addproveedor.module#AddproveedorModule' },
            { path: 'list', loadChildren: './listproveedor/listproveedor.module#ListproveedorModule' }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ProveedorRoutingModule {}
