import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AsignacionCaracteristicasComponent } from './asignacioncaracteristicas.component';

const routes: Routes = [
    {
        path: '',
        component: AsignacionCaracteristicasComponent,
        children: [
            { path: '', redirectTo: 'list' },
            { path: 'list' , loadChildren: './listasignacioncaracteristicas/listasignacioncaracteristicas.module#ListAsignacionCaracteristicasModule'}
          /*  { path: 'add' , loadChildren: './addingresos/addingresos.module#AddingresosModule'},
            { path: 'ver/:idi', loadChildren: './veringreso/veringreso.module#VeringresoModule'}*/
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AsignacionCaracteristicasRoutingModule {}
