import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VeringresoComponent } from './veringreso.component';

const routes: Routes = [
    {
        path: '',
        component: VeringresoComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class VeringresoRoutingModule {}
