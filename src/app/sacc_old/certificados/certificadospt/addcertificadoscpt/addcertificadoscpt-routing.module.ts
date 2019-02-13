import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddcertificadoscptComponent } from './addcertificadoscpt.component';

const routes: Routes = [
    {
        path: '',
        component: AddcertificadoscptComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AddcertificadoscptRoutingModule {}
