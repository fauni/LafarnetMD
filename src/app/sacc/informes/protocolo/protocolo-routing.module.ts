import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProtocoloComponent } from './protocolo.component';

const routes: Routes = [
    {
        path: '',
        component: ProtocoloComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ProtocoloRoutingModule {}
