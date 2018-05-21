import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListasignacionmpComponent } from './listasignacionmp.component';

const routes: Routes = [
    {
        path: '',
        component: ListasignacionmpComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ListasignacionmpRoutingModule {}
