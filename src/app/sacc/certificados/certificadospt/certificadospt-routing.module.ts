import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CertificadosptComponent } from './certificadospt.component';

const routes: Routes = [
    {
        path: '',
        component: CertificadosptComponent,
        children: [
            { path: '', redirectTo: 'list' },
            { path: 'list', loadChildren: './listcertificadospt/listcertificadospt.module#ListcertificadosptModule' },
            { path: 'add', loadChildren: './addcertificadopt/addcertificadopt.module#AddcertificadoptModule' }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CertificadosptRoutingModule {}
