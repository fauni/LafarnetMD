import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AreasRoutingModule } from './areas-routing.module';
import { AreasComponent } from './areas.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { FormsModule } from '@angular/forms';

@NgModule({
    imports: [
        CommonModule,
        AreasRoutingModule,
        Ng2SearchPipeModule,
        FormsModule
    ],
    declarations: [
        AreasComponent
    ]
})
export class AreasModule {}
