import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddingresosRoutingModule } from './addingresos-routing.module';
import { AddingresosComponent } from './addingresos.component';
import { MzModalModule, MzButtonModule, MzInputModule, MzCardModule, MzDatepickerModule, MzSelectModule } from 'ng2-materialize';
import { Ng2CompleterModule } from 'ng2-completer';
import { FormsModule } from '@angular/forms';
@NgModule({
    imports: [
        CommonModule,
        AddingresosRoutingModule,
        MzModalModule,
        MzButtonModule,
        FormsModule,
        MzInputModule,
        MzCardModule,
        MzDatepickerModule,
        MzSelectModule,
        Ng2CompleterModule
    ],
    declarations: [AddingresosComponent]
})
export class AddingresosModule {}
