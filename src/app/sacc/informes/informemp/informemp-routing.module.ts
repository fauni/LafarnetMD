import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InformempComponent } from './informemp.component';

const routes: Routes = [
    {
        path: '',
        component: InformempComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class InformempRoutingModule {}
