import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListAsignacionCaracteristicasComponent } from './listasignacioncaracteristicas.component';

const routes: Routes = [
    {
        path: '',
        component: ListAsignacionCaracteristicasComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ListAsignacionCaracteristicasRoutingModule {}
