import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CertificadosmpComponent } from './certificadosmp.component';

const routes: Routes = [
    {
        path: '',
        component: CertificadosmpComponent,
        children: [
            { path: '', redirectTo: 'add' },
            { path: 'add', loadChildren: './addcertificadosmp/addcertificadosmp.module#AddcertificadosmpModule' },
            { path: 'list', loadChildren: './listcertificadosmp/listcertificadosmp.module#ListcertificadosmpModule' }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CertificadosmpRoutingModule {}
