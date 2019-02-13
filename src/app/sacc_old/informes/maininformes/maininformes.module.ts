import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaininformesRoutingModule } from './maininformes-routing.module';
import { MaininformesComponent } from './maininformes.component';
import {
    MzNavbarModule,
    MzTabModule,
    MzCheckboxModule,
    MzCardModule,
    MzButtonModule,
    MzIconModule,
    MzIconMdiModule
} from 'ng2-materialize';


@NgModule({
    imports: [
        CommonModule,
        MaininformesRoutingModule,
        MzNavbarModule,
        MzTabModule,
        MzCheckboxModule,
        MzCardModule,
        MzButtonModule,
        MzIconModule,
        MzIconMdiModule
    ],
    declarations: [MaininformesComponent]
})

export class MaininformesModule {}
