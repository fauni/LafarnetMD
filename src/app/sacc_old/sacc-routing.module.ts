import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SaccComponent } from './sacc.component';

const routes: Routes = [
    {
        path: '',
        component: SaccComponent,
        children: [
            { path: '', redirectTo: 'main' },
            { path: 'main', loadChildren: './mainsacc/mainsacc.module#MainsaccModule' },
            { path: 'certificados', loadChildren: './certificados/certificados.module#CertificadosModule' },
            { path: 'datos', loadChildren: './datos/datos.module#DatosModule'},
            { path: 'informes', loadChildren: './informes/informes.module#InformesModule' },
            { path: 'asignacion', loadChildren: './asignacion/asignacion.module#AsignacionModule'}
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SaccRoutingModule {}
