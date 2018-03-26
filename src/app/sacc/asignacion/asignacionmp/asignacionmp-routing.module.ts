import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AsignacionmpComponent } from './asignacionmp.component';

const routes: Routes = [
    {
        path: '',
        component: AsignacionmpComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AsignacionmpRoutingModule {}
