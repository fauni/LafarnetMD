import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListcertificadosmpComponent } from './listcertificadosmp.component';
import { ListcertificadosmpRoutingModule } from './listcertificadosmp-routing.module';
import { CertificadosService } from '../../certificados.service';
import { NgxPaginationModule } from 'ngx-pagination';
import { Ng2OrderModule } from 'ng2-order-pipe';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { FormsModule } from '@angular/forms';
import { MzParallaxModule, MzButtonModule, MzModalModule } from 'ng2-materialize';

@NgModule({
    imports: [
        CommonModule,
        ListcertificadosmpRoutingModule,
        NgxPaginationModule,
        Ng2OrderModule,
        Ng2SearchPipeModule,
        FormsModule,
        MzParallaxModule,
        MzButtonModule,
        MzModalModule
    ],
    declarations: [ListcertificadosmpComponent],
    providers: [CertificadosService]
})

export class ListcertificadosmpModule {}
