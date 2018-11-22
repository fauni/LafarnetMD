import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SolicitudComponent } from './solicitud.component';

const routes: Routes = [
    {
        path: '',
        component: SolicitudComponent,
        children: [
            { path: '', redirectTo: 'add' },
            { path: 'add', loadChildren: './addsc/addsc.module#AddscModule' },
            { path: 'list', loadChildren: './listsc/listsc.module#ListscModule' }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SolicitudRoutingModule {}
