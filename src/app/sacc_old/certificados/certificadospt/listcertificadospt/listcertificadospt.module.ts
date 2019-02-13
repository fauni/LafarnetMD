import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListcertificadosptRoutingModule } from './listcertificadospt-routing.module';
import { ListcertificadosptComponent } from './listcertificadospt.component';
import { CertificadosService } from '../../certificados.service';
import { MzParallaxModule, MzButtonModule, MzModalModule } from 'ng2-materialize';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { Ng2OrderModule } from 'ng2-order-pipe';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

@NgModule({
    imports: [
        CommonModule,
        ListcertificadosptRoutingModule,
        NgxPaginationModule,
        Ng2OrderModule,
        Ng2SearchPipeModule,
        FormsModule,
        MzParallaxModule,
        MzButtonModule,
        MzModalModule
    ],
    declarations: [ListcertificadosptComponent],
    providers: [CertificadosService]
})

export class ListcertificadosptModule {}
