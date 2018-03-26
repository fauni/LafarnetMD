import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MainsaccComponent} from './mainsacc.component';


const routes: Routes = [
    {
        path: '', component: MainsaccComponent
    }
];


@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class MainsaccRoutingModule {
}
