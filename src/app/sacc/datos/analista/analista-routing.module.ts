import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AnalistaComponent } from './analista.component';

const routes: Routes = [
    {
        path: '',
        component: AnalistaComponent,
        children: [
            { path: '', redirectTo: 'list' },
            { path: 'list', loadChildren: './listanalista/listanalista.module#ListanalistaModule' }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AnalistaRoutingModule {}
