import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IngresosComponent } from './ingresos.component';

const routes: Routes = [
    {
        path: '',
        component: IngresosComponent,
        children: [
            { path: '', redirectTo: 'list' },
            { path: 'list' , loadChildren: './listingresos/listingresos.module#ListingresosModule'},
            { path: 'add' , loadChildren: './addingresos/addingresos.module#AddingresosModule'}
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class IngresosRoutingModule {}
