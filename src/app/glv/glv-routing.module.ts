import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GlvComponent } from './glv.component';

const routes: Routes = [
    {
        path: '',
        component: GlvComponent,
        children: [
            { path: '', redirectTo: 'add' },
            { path: 'add', loadChildren: './solicitudesglv/solicitudesglv.module#SolicitudesglvModule' }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class GlvRoutingModule {}
