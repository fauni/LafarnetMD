import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OrdenComponent } from './orden.component';

const routes: Routes = [
    {
        path: '',
        component: OrdenComponent,
        children: [
            { path: '', redirectTo: 'add' },
            { path: 'add', loadChildren: './addoc/addoc.module#AddocModule' },
            { path: 'list', loadChildren: './listoc/listoc.module#ListocModule' },
            { path: 'notify', loadChildren: './notifyoc/notifyoc.module#NotifyocModule' }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class OrdenRoutingModule {}
