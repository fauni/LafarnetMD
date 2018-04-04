import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AnalistaComponent } from './analista.component';

const routes: Routes = [
    {
        path: '',
        component: AnalistaComponent,
        children: [
            { path: '', redirectTo: 'list' },
            { path: 'list', loadChildren: './listanalista/listanalista.module#ListanalistaModule' },
            { path: 'add' , loadChildren: './addanalista/addanalista.module#AddanalistaModule'},
            { path: 'detail/:id' , loadChildren: './detailanalista/detailanalista.module#DetailanalistaModule'}
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AnalistaRoutingModule {}
