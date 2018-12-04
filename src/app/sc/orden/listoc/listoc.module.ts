import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MzParallaxModule, MzCardModule, MzIconMdiModule, MzBadgeModule, MzButtonModule, MzModalModule } from 'ng2-materialize';
import { ListocRoutingModule } from './listoc-routing.module';
import { ListocComponent } from './listoc.component';


@NgModule({
    imports: [
        CommonModule,
        ListocRoutingModule,
        MzParallaxModule,
        MzCardModule,
        MzIconMdiModule,
        MzBadgeModule,
        MzButtonModule,
        MzModalModule

    ],
    declarations: [
        ListocComponent
    ]
})

export class ListocModule {}