import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OrdenComponent } from './orden.component';

const routes: Routes = [
    {
        path: '',
        component: OrdenComponent,
        children: [
            { path: '', redirectTo: 'solicitud' },
            { path: 'add/:id', loadChildren: './addoc/addoc.module#AddocModule' },
            { path: 'list', loadChildren: './listoc/listoc.module#ListocModule' },
            { path: 'notify/:id', loadChildren: './notifyoc/notifyoc.module#NotifyocModule' },
            { path: 'solicitud', loadChildren: './searchsc/searchsc.module#SearchscModule' },
            { path: 'detailoc/:id', loadChildren: './detailoc/detailoc.module#DetailocModule' }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class OrdenRoutingModule {}
