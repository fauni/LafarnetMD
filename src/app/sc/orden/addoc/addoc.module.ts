import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MzParallaxModule, MzCardModule, MzButtonModule, MzInputModule, MzIconMdiModule, MzDatepickerModule } from 'ng2-materialize';
import { AddocRoutingModule } from './addoc-routing.module';
import { AddocComponent } from './addoc.component';


@NgModule({
    imports: [
        CommonModule,
        AddocRoutingModule,
        MzParallaxModule,
        MzCardModule,
        MzButtonModule,
        MzInputModule,
        MzIconMdiModule,
        MzDatepickerModule,
        MzButtonModule,
        MzIconMdiModule
    ],
    declarations: [
        AddocComponent
    ]
})

export class AddocModule {}