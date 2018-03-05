import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';


const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
        children: [
            { path: '', redirectTo: 'publicaciones' },
            { path: 'publicaciones', loadChildren: './publicaciones/publicaciones.module#PublicacionesModule'},
            { path: 'detalle', loadChildren: './detalle-publicacion/detalle-publicacion.module#DetallePublicacionModule'}
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class HomeRoutingModule {
}