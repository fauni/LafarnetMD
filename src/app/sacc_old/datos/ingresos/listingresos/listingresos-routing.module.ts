import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListingresosComponent } from './listingresos.component';

const routes: Routes = [
    {
        path: '',
        component: ListingresosComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ListingresosRoutingModule {}
