import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MzCardModule, MzButtonModule, MzSelectModule, MzInputModule, MzIconMdiModule, MzSpinnerModule, MzCheckboxModule, MzToastService } from 'ng2-materialize';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { Ng2OrderModule } from 'ng2-order-pipe';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule } from '@angular/forms';
import { ListaaddmpRoutingModule } from './listaaddmp-routing.module';
import { ListaaddmpComponent } from './listaaddmp.component';
import { AsignacionService } from '../../asignacion.service';

@NgModule({
    imports: [
        CommonModule,
        ListaaddmpRoutingModule,
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
    declarations: [ListaaddmpComponent],
    providers: [AsignacionService, MzToastService]
})

export class ListaaddmpModule {}
