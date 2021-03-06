import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HorasextrasComponent } from './horasextras.component';
import { HorasextrasRoutingModule } from './horasextras-routing.module';
import { FormsModule } from '@angular/forms';
import { MzParallaxModule, MzSpinnerModule, MzCardModule, MzSelectModule, MzInputModule,
    MzCheckboxModule, MzButtonModule, MzIconMdiModule, MzIconModule, MzRadioButtonModule, MzDatepickerModule, MzToastService, MzToastModule } from 'ng2-materialize';
import { HorasExtrasService } from './horasextras.service';
import { MzSwitchModule } from 'ng2-materialize';

import { AmazingTimePickerModule } from 'amazing-time-picker';

@NgModule({
    imports: [
        CommonModule,
        HorasextrasRoutingModule,
        FormsModule,
        MzParallaxModule,
        MzSpinnerModule,
        MzCardModule,
        MzSelectModule,
        MzInputModule,
        MzRadioButtonModule,
        MzCheckboxModule,
        MzDatepickerModule,
        MzButtonModule,
        MzIconMdiModule,
        MzIconModule,
        MzSwitchModule,
        AmazingTimePickerModule,
        MzToastModule
    ],
    declarations: [HorasextrasComponent],
    providers: [HorasExtrasService, MzToastService]
})

export class HorasextrasModule {}
