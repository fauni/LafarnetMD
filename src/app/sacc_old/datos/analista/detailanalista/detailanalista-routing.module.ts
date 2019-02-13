import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DetailanalistaComponent } from './detailanalista.component';

const routes: Routes = [
    {
        path: '',
        component: DetailanalistaComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DetailanalistaRoutingModule {}
