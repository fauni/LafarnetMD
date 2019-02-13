import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListaaddmpComponent } from './listaaddmp.component';

const routes: Routes = [
    {
        path: '',
        component: ListaaddmpComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ListaaddmpRoutingModule {}
