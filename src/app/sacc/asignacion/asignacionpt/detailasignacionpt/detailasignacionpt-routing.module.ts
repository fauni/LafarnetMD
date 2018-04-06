import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DetailasignacionptComponent } from './detailasignacionpt.component';

const routes: Routes = [
    {
        path: '',
        component: DetailasignacionptComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DetailasignacionptRoutingModule {}
