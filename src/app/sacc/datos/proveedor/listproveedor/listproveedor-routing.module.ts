import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListproveedorComponent } from './listproveedor.component';

const routes: Routes = [
    {
        path: '',
        component: ListproveedorComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ListproveedorRoutingModule {}
