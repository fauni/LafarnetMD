import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddproveedorComponent } from './addproveedor.component';

const routes: Routes = [
    {
        path: '',
        component: AddproveedorComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AddproveedorRoutingModule {}
