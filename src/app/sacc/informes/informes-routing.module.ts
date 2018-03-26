import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {InformesComponent} from './informes.component';


const routes: Routes = [
    {
        path: '', component: InformesComponent,
        children: [
            { path: '', redirectTo: 'main' },
            { path: 'main', loadChildren: './maininformes/maininformes.module#MaininformesModule' },
            { path: 'mp', loadChildren: './informemp/informemp.module#InformempModule' },
            { path: 'pt', loadChildren: './informept/informept.module#InformeptModule' },
            { path: 'lotes', loadChildren: './lotesterminados/lotesterminados.module#LotesterminadosModule' },
            { path: 'protocolo', loadChildren: './protocolo/protocolo.module#ProtocoloModule' },
            { path: 'disolucion', loadChildren: './testdisolucioni/testdisolucioni.module#TestdisolucioniModule' },
            { path: 'uniformidad', loadChildren: './uniformidad/uniformidad.module#UniformidadModule' }
        ]
    }
];


@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class InformesRoutingModule {
}
