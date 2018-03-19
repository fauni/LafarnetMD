import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { AppComponent } from './app.component';
import { AuthGuard } from './shared';

const routes: Routes = [
    { path: '', loadChildren: './layout/layout.module#LayoutModule', canActivate: [AuthGuard] },
    { path: 'admin', loadChildren: './admin-intranet/admin-intranet.module#AdminIntranetModule', canActivate: [AuthGuard] },
    { path: 'accidentes', loadChildren: './accidentes/accidentes.module#AccidentesModule', canActivate: [AuthGuard] },
    { path: 'mantenimiento', loadChildren: './mantenimiento/mantenimiento.module#MantenimientoModule', canActivate: [AuthGuard] },
    { path: 'acciones', loadChildren: './acciones/acciones.module#AccionesModule', canActivate: [AuthGuard] },
    { path: 'almacenes', loadChildren: './almacenes/almacenes.module#AlmacenesModule', canActivate: [AuthGuard] },
    //{ path: 'mantenimientodap', loadChildren: './mantenimientodap/mantenimientodap.module#MantenimientodapModule', canActivate: [AuthGuard] },
    { path: 'vismed', loadChildren: './vismed/vismed.module#VismedModule', canActivate: [AuthGuard] },
    { path: 'produccion', loadChildren: './produccion/produccion.module#ProduccionModule', canActivate: [AuthGuard] },
    { path: 'dolibarrmkt', loadChildren: './dolibarrmkt/dolibarrmkt.module#DolibarrmktModule', canActivate: [AuthGuard] },
    { path: 'dvisita1718', loadChildren: './dvisita1718/dvisita1718.module#Dvisita1718Module', canActivate: [AuthGuard] },
    { path: 'glv', loadChildren: './glv/glv.module#GlvModule', canActivate: [AuthGuard] },
    { path: 'dolibarrlcc', loadChildren: './dolibarrlcc/dolibarrlcc.module#DolibarrlccModule', canActivate: [AuthGuard] },
    /*{ path: 'solcompras', loadChildren: './solcompras/solcompras.module#SolcomprasModule', canActivate: [AuthGuard] },
    { path: 'dvisita1617', loadChildren: './dvisita1617/dvisita1617.module#Dvisita1617Module', canActivate: [AuthGuard] },
    */
    { path: 'proforms', loadChildren: './proforms/proforms.module#ProformsModule', canActivate: [AuthGuard] },
    //{ path: 'repdolibarr', loadChildren: './repdolibarr/repdolibarr.module#RepdolibarrModule', canActivate: [AuthGuard] },
    //{ path: 'ghdocs', loadChildren: './ghdocs/ghdocs.module#GhdocsModule', canActivate: [AuthGuard] },

    { path: 'restorepass/:id', loadChildren: './restorepass/restorepass.module#RestorePassModule' },
    { path: 'recovery', loadChildren: './recovery/recovery.module#RecoveryModule' },
    { path: 'login', loadChildren: './login/login.module#LoginModule' },
    { path: 'sacc', loadChildren: './sacc/sacc.module#SaccModule' }, //Ruta del NEW SACC
    { path: 'error', loadChildren: 'app/server-error/server-error.module#ServerErrorModule' },
    { path: 'access-denied', loadChildren: 'app/access-denied/access-denied.module#AccessDeniedModule' },
    { path: 'not-found', loadChildren: 'app/not-found/not-found.module#NotFoundModule' },
    { path: '**', redirectTo: 'not-found' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes,
        {
            useHash: true,
            preloadingStrategy: PreloadAllModules
        }
    )],
    exports: [RouterModule]
})
export class AppRoutingModule {}
