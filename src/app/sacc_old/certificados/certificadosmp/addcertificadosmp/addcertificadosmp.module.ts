import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MzParallaxModule,
    MzModalModule,
    MzIconMdiModule,
    MzButtonModule,
    MzInputModule,
    MzNavbarModule,
    MzDropdownModule,
    MzSelectModule,
    MzDatepickerModule,
    MzTabModule,
    MzSpinnerModule,
    MzTextareaModule,
    MzCheckboxModule
} from 'ng2-materialize';
import { FormsModule } from '@angular/forms';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { Ng2OrderModule } from 'ng2-order-pipe';
import { NgxPaginationModule } from 'ngx-pagination';
import { MzCardModule, MzSwitchModule, MzToastService } from 'ng2-materialize';
import { Ng2CompleterModule } from 'ng2-completer';
import { SimpleNotificationsModule, NotificationsService } from 'angular2-notifications';
import { AddcertificadosmpRoutingModule } from './addcertificadosmp-routing.module';
import { AddcertificadosmpComponent } from './addcertificadosmp.component';
import { AnalistasService } from '../../../datos/analista/analista.service';
import { ProductosService } from '../../../datos/productos/productos.service';
import { AsignacionService } from '../../../asignacion/asignacion.service';
import { CertificadosService } from '../../certificados.service';
import { ProveedoresService } from '../../../datos/proveedor/proveedor.service';
import { NgSelectModule } from '@ng-select/ng-select';

@NgModule({
    imports: [
        CommonModule,
        AddcertificadosmpRoutingModule,
        Ng2CompleterModule,
        Ng2SearchPipeModule,
        Ng2OrderModule,
        NgxPaginationModule,
        MzNavbarModule,
        MzDropdownModule,
        MzSelectModule,
        MzParallaxModule,
        MzModalModule,
        MzDatepickerModule,
        MzIconMdiModule,
        MzButtonModule,
        MzInputModule,
        MzTextareaModule,
        MzCardModule,
        MzTabModule,
        MzCheckboxModule,
        FormsModule,
        SimpleNotificationsModule,
        MzSpinnerModule,
        MzSwitchModule,
        NgSelectModule
    ],
    declarations: [AddcertificadosmpComponent],
    providers: [NotificationsService, AnalistasService,
        ProductosService, AsignacionService, CertificadosService, MzToastService, ProveedoresService]
})
export class AddcertificadosmpModule {}
