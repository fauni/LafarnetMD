import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LotesterminadosComponent } from './lotesterminados.component';

const routes: Routes = [
    {
        path: '',
        component: LotesterminadosComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LotesterminadosRoutingModule {}
