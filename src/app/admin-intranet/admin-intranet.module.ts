import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminIntranetRoutingModule } from './admin-intranet-routing.module';
import { AdminIntranetComponent } from './admin-intranet.component';
import { NgxSmartModalModule, NgxSmartModalService } from 'ngx-smart-modal';
import { LayoutModule } from '../layout/layout.module';
import { UsersService } from './users/users.service';

@NgModule({
    imports: [
        CommonModule,
        AdminIntranetRoutingModule,
        NgxSmartModalModule,
        LayoutModule
    ],
    declarations: [AdminIntranetComponent],
    providers: [ NgxSmartModalService, UsersService]
})

export class AdminIntranetModule {}
