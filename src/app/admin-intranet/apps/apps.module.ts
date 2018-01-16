import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppsRoutingModule } from './apps-routing.module';
import { AppsComponent } from './apps.component';


@NgModule({
    imports: [
        CommonModule,
        AppsRoutingModule
    ],
    declarations: [
        AppsComponent
    ]
})
export class AppsModule {}
