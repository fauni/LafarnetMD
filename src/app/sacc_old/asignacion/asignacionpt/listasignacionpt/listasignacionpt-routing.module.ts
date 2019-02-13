import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListasignacionptComponent } from './listasignacionpt.component';

const routes: Routes = [
    {
        path: '',
        component: ListasignacionptComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ListasignacionptRoutingModule {}
