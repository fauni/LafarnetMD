import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DetailcertificadosmpRoutingModule } from './detailcertificadosmp-routing.module';
import { DetailcertificadosmpComponent } from './detailcertificadosmp.component';
import { CertificadosnService } from '../../certificadosn.service';
import { MzToastService, MzCardModule, MzButtonModule, MzModalModule } from 'ng2-materialize';
import { JasperoConfirmationsModule } from '@jaspero/ng2-confirmations';

@NgModule({
    imports: [
        CommonModule,
        DetailcertificadosmpRoutingModule,
        FormsModule,
        MzCardModule, 
        MzButtonModule,
        MzModalModule,
        JasperoConfirmationsModule
    ],
    declarations: [DetailcertificadosmpComponent],
    providers: [CertificadosnService, MzToastService]
})

export class DetailcertificadosmpModule {}
