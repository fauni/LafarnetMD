import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {DatosComponent} from './datos.component';


const routes: Routes = [
    {
        path: '', component: DatosComponent,
        children: [
            { path: '', redirectTo: 'main' },
            { path: 'main', loadChildren: './maindatos/maindatos.module#MaindatosModule' },
            { path: 'productos', loadChildren: './productos/productos.module#ProductosModule' },
            { path: 'analista', loadChildren: './analista/analista.module#AnalistaModule' },
            { path: 'proveedor', loadChildren: './proveedor/proveedor.module#ProveedorModule' }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class DatosRoutingModule {
}
