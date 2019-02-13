import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MaindatosComponent } from './maindatos.component';

const routes: Routes = [
    {
        path: '',
        component: MaindatosComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class MaindatosRoutingModule {}
