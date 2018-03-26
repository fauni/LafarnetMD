import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InformeptComponent } from './informept.component';

const routes: Routes = [
    {
        path: '',
        component: InformeptComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class InformeptRoutingModule {}
