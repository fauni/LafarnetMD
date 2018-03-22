import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListanalistaRoutingModule } from './listanalista-routing.module';
import { ListanalistaComponent } from './listanalista.component';
import { MzModalModule, MzButtonModule, MzInputModule, MzCardModule } from 'ng2-materialize';
import { FormsModule } from '@angular/forms';
@NgModule({
    imports: [
        CommonModule,
        ListanalistaRoutingModule,
        MzModalModule,
        MzButtonModule,
        FormsModule,
        MzInputModule,
        MzCardModule
    ],
    declarations: [ListanalistaComponent]
})

export class ListanalistaModule {
}
