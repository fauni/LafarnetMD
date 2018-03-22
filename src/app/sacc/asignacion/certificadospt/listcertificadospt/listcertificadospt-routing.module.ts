import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListcertificadosptComponent } from './listcertificadospt.component';

const routes: Routes = [
    {
        path: '',
        component: ListcertificadosptComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ListcertificadosptRoutingModule {}
