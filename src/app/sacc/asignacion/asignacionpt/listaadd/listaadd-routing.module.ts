import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListaaddComponent } from './listaadd.component';

const routes: Routes = [
    {
        path: '',
        component: ListaaddComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ListaaddRoutingModule {}
