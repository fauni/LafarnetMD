import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MzParallaxModule, MzCardModule, MzIconMdiModule, MzBadgeModule, MzButtonModule, MzInputModule } from 'ng2-materialize';
import { NotifyocRoutingModule } from './notifyoc-routing.module';
import { NotifyocComponent } from './notifyoc.component';


@NgModule({
    imports: [
        CommonModule,
        NotifyocRoutingModule,
        MzParallaxModule,
        MzCardModule,
        MzIconMdiModule,
        MzBadgeModule,
        MzButtonModule,
        MzInputModule
    ],
    declarations: [
        NotifyocComponent
    ]
})

export class NotifyocModule {}