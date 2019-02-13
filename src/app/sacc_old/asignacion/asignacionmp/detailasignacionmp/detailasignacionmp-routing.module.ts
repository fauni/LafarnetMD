import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DetailasignacionmpComponent } from './detailasignacionmp.component';

const routes: Routes = [
    {
        path: '',
        component: DetailasignacionmpComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DetailasignacionmpRoutingModule {}
