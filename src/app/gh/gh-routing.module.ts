import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GhComponent } from './gh.component';

const routes: Routes = [
    {
        path: '',
        component: GhComponent,
        children: [
            { path: '', redirectTo: 'he'},
            { path: 'he', loadChildren: './horasextras/horasextras.module#HorasextrasModule'}
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class GhRoutingModule {}
