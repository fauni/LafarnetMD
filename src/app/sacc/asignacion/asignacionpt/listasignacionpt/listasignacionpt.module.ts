import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListasignacionptRoutingModule } from './listasignacionpt-routing.module';
import { ListasignacionptComponent } from './listasignacionpt.component';
import { MzCardModule, MzButtonModule, MzSelectModule, MzInputModule, MzIconMdiModule, MzSpinnerModule } from 'ng2-materialize';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { Ng2OrderModule } from 'ng2-order-pipe';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule } from '@angular/forms';

@NgModule({
    imports: [
        CommonModule,
        ListasignacionptRoutingModule,
        Ng2SearchPipeModule,
        Ng2OrderModule,
        NgxPaginationModule,
        MzCardModule,
        MzButtonModule,
        MzSelectModule,
        MzInputModule,
        MzIconMdiModule,
        MzSpinnerModule,
        FormsModule,
    ],
    declarations: [ListasignacionptComponent]
})

export class ListasignacionptModule {}
