import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AsignacionmpComponent } from './asignacionmp.component';

const routes: Routes = [
    {
        path: '',
        component: AsignacionmpComponent,
        children: [
            { path: '', redirectTo: 'main' },
            { path: 'main', loadChildren: './listasignacionmp/listasignacionmp.module#ListasignacionmpModule' },
            { path: 'detail/:id/:code', loadChildren: './detailasignacionmp/detailasignacionmp.module#DetailasignacionmpModule' }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AsignacionmpRoutingModule {}
