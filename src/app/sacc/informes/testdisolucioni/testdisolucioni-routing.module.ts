import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TestdisolucioniComponent } from './testdisolucioni.component';

const routes: Routes = [
    {
        path: '',
        component: TestdisolucioniComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class TestdisolucioniRoutingModule {}
