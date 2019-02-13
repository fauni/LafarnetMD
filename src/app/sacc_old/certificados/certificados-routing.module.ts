import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CertificadosComponent } from './certificados.component';


const routes: Routes = [
    {
        path: '', component: CertificadosComponent,
        children: [
            { path: '', redirectTo: 'main' },
            { path: 'main', loadChildren: './maincertificados/maincertificados.module#MaincertificadosModule' },
            { path: 'mp', loadChildren: './certificadosmp/certificadosmp.module#CertificadosmpModule' },
            { path: 'pt', loadChildren: './certificadospt/certificadospt.module#CertificadosptModule' }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class CertificadosRoutingModule {
}
