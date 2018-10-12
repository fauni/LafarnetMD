import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DetailcertificadosptComponent } from './detailcertificadospt.component';

const routes: Routes = [
    {
        path: '',
        component: DetailcertificadosptComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DetailcertificadosptRoutingModule {}