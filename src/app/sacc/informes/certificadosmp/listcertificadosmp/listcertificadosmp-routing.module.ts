import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListcertificadosmpComponent } from './listcertificadosmp.component';

const routes: Routes = [
    {
        path: '',
        component: ListcertificadosmpComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ListcertificadosmpRoutingModule {}
