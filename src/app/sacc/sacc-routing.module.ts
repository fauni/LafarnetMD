import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SaccComponent } from './sacc.component';

const routes: Routes = [
    {
        path: '',
        component: SaccComponent,
        children: [
            { path: '', redirectTo: 'certificados' },
            { path: 'certificados', loadChildren: './certificados/certificados.module#CertificadosModule' }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SaccRoutingModule {}
