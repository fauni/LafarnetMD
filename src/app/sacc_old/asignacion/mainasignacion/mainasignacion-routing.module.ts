import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainasignacionComponent } from './mainasignacion.component';

const routes: Routes = [
    {
        path: '',
        component: MainasignacionComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class MainasignacionRoutingModule {}
