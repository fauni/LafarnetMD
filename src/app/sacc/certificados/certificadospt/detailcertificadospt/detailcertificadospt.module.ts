import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DetailcertificadosptRoutingModule } from './detailcertificadospt-routing.module';
import { DetailcertificadosptComponent } from './detailcertificadospt.component';
import { CertificadosnService } from '../../certificadosn.service';
import { MzToastService, MzCardModule, MzButtonModule, MzModalModule } from 'ng2-materialize';
import { JasperoConfirmationsModule } from '@jaspero/ng2-confirmations';

@NgModule({
    imports: [
        CommonModule,
        DetailcertificadosptRoutingModule,
        FormsModule,
        MzCardModule, 
        MzButtonModule,
        MzModalModule,
        JasperoConfirmationsModule
    ],
    declarations: [DetailcertificadosptComponent],
    providers: [CertificadosnService, MzToastService]
})

export class DetailcertificadosptModule {}
