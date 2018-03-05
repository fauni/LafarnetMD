import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DetallePublicacionComponent } from './detalle-publicacion.component';

const routes: Routes = [
    {
        path: '', component: DetallePublicacionComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class DetallePublicacionRoutingModule {
}
