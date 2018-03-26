import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutModule } from '../layout/layout.module';
import { SaccRoutingModule } from './sacc-routing.module';
import { SaccComponent } from './sacc.component';
import { CookieService } from 'angular2-cookie/services/cookies.service';

@NgModule({
    imports: [
        CommonModule,
        SaccRoutingModule,
        LayoutModule
    ],
    providers: [
        CookieService
      ],
    declarations: [SaccComponent]
})

export class SaccModule {}
