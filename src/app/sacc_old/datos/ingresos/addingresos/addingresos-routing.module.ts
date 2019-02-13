import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddingresosComponent } from './addingresos.component';

const routes: Routes = [
    {
        path: '',
        component: AddingresosComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AddingresosRoutingModule {}
