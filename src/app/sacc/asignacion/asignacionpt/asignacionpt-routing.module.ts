import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AsignacionptComponent } from './asignacionpt.component';

const routes: Routes = [
    {
        path: '',
        component: AsignacionptComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AsignacionptRoutingModule {}
