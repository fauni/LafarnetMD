import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {InformesComponent} from './informes.component';


const routes: Routes = [
    {
        path: '', component: InformesComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class InformesRoutingModule {
}
