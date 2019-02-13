import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MaininformesComponent } from './maininformes.component';

const routes: Routes = [
    {
        path: '',
        component: MaininformesComponent,
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class MaininformesRoutingModule {}
