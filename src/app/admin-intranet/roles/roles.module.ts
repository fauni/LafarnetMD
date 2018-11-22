import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RolesRoutingModule } from './roles-routing.module';
import { RolesComponent } from './roles.component';
import { RolesService } from './roles.service';
import { MzCheckboxModule, MzCardModule } from 'ng2-materialize';


@NgModule({
    imports: [
        CommonModule,
        RolesRoutingModule,
        MzCheckboxModule,
        MzCardModule
    ],
    declarations: [
        RolesComponent
    ],
    providers:[
        RolesService
    ]
})
export class RolesModule {}
