import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CertificadosmpComponent } from './certificadosmp.component';

const routes: Routes = [
    {
        path: '',
        component: CertificadosmpComponent,
        children: [
            { path: '', redirectTo: 'list' },
            { path: 'add', loadChildren: './addcertificadosmp/addcertificadosmp.module#AddcertificadosmpModule' },
            { path: 'addcmp/:id', loadChildren: './addcertificadoscmp/addcertificadoscmp.module#AddcertificadoscmpModule' },
            { path: 'list', loadChildren: './listcertificadosmp/listcertificadosmp.module#ListcertificadosmpModule' },
            { path: 'detail/:id', loadChildren: './detailcertificadosmp/detailcertificadosmp.module#DetailcertificadosmpModule' }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CertificadosmpRoutingModule {}
