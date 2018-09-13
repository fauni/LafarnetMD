import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MzCardModule, MzButtonModule, MzSelectModule, MzInputModule, MzIconMdiModule, MzSpinnerModule, MzCheckboxModule } from 'ng2-materialize';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { Ng2OrderModule } from 'ng2-order-pipe';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule } from '@angular/forms';
import { ListaaddRoutingModule } from './listaadd-routing.module';
import { ListaaddComponent } from './listaadd.component';
import { AsignacionService } from '../../asignacion.service';

@NgModule({
    imports: [
        CommonModule,
        ListaaddRoutingModule,
        Ng2SearchPipeModule,
        Ng2OrderModule,
        NgxPaginationModule,
        MzCardModule,
        MzButtonModule,
        MzSelectModule,
        MzInputModule,
        MzIconMdiModule,
        MzSpinnerModule,
        MzCheckboxModule,
        FormsModule,
    ],
    declarations: [ListaaddComponent],
    providers: [AsignacionService]
})

export class ListaaddModule {}
