import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MaincertificadosComponent } from './maincertificados.component';

const routes: Routes = [
    {
        path: '',
        component: MaincertificadosComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class MaincertificadosRoutingModule {}
