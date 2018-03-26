import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProtocoloRoutingModule } from './protocolo-routing.module';
import { ProtocoloComponent } from './protocolo.component';

@NgModule({
    imports: [
        CommonModule,
        ProtocoloRoutingModule
    ],
    declarations: [ProtocoloComponent]
})

export class ProtocoloModule {}
