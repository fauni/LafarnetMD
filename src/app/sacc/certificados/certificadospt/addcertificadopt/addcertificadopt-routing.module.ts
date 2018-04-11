import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddcertificadoptComponent } from './addcertificadopt.component';

const routes: Routes = [
    {
        path: '',
        component: AddcertificadoptComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AddcertificadoptRoutingModule {}
