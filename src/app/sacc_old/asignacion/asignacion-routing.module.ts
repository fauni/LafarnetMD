import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AsignacionComponent} from './asignacion.component';


const routes: Routes = [
    {
        path: '', component: AsignacionComponent,
        children: [
            { path: '', redirectTo: 'main' },
            { path: 'main', loadChildren: './mainasignacion/mainasignacion.module#MainasignacionModule' },
            { path: 'mp', loadChildren: './asignacionmp/asignacionmp.module#AsignacionmpModule' },
            { path: 'pt', loadChildren: './asignacionpt/asignacionpt.module#AsignacionptModule' },
            { path: 'parm', loadChildren: './asignacionparm/asignacionparm.module#AsignacionparmModule' },
            { path: 'carac', loadChildren: './asignacioncaracteristicas/asignacioncaracteristicas.module#AsignacionCaracteristicasModule' }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class AsignacionRoutingModule {
}
