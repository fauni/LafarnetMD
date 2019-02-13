import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DetailcertificadosmpComponent } from './detailcertificadosmp.component';

const routes: Routes = [
    {
        path: '',
        component: DetailcertificadosmpComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DetailcertificadosmpRoutingModule {}