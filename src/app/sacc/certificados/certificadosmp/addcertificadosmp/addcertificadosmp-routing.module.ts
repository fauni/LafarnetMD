import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddcertificadosmpComponent } from './addcertificadosmp.component';

const routes: Routes = [
    {
        path: '',
        component: AddcertificadosmpComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AddcertificadosmpRoutingModule {}
