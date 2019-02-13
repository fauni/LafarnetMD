import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AsignacionparmComponent } from './asignacionparm.component';

const routes: Routes = [
    {
        path: '',
        component: AsignacionparmComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AsignacionparmRoutingModule {}
