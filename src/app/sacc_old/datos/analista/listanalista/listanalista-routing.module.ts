import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListanalistaComponent } from './listanalista.component';

const routes: Routes = [
    {
        path: '',
        component: ListanalistaComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ListanalistaRoutingModule {}
