import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AsignacionptComponent } from './asignacionpt.component';

const routes: Routes = [
    {
        path: '',
        component: AsignacionptComponent,
        children: [
            { path: '', redirectTo: 'main' },
            { path: 'main', loadChildren: './listasignacionpt/listasignacionpt.module#ListasignacionptModule' }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AsignacionptRoutingModule {}
