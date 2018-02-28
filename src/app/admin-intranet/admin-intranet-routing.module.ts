import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminIntranetComponent } from './admin-intranet.component';

const routes: Routes = [
    {
        path: '',
        component: AdminIntranetComponent,
        children: [
            { path: '', redirectTo: 'users' },
            { path: 'users', loadChildren: './users/users.module#UsersModule' },
            { path: 'apps', loadChildren: './apps/apps.module#AppsModule' },
            { path: 'areas', loadChildren: './areas/areas.module#AreasModule' },
            { path: 'secciones', loadChildren: './secciones/secciones.module#SeccionesModule' },
            { path: 'profile', loadChildren: './profile/profile.module#ProfileModule' }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AdminIntranetRoutingModule {}
