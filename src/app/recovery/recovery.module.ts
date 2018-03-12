import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MzIconMdiModule,
    MzValidationModule,
    MzInputModule, MzModalModule, MzInjectionModule, MzButtonModule, MzProgressModule } from 'ng2-materialize';
import { MzSpinnerModule } from 'ng2-materialize';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SimpleNotificationsModule } from 'angular2-notifications';
import { JasperoAlertsModule } from '@jaspero/ng2-alerts';
import { RecoveryRoutingModule } from './recovery-routing.module';
import { RecoveryComponent } from './recovery.component';
import { AlertComponent } from './alert/alert.component';


@NgModule({
    imports: [
        CommonModule,
        RecoveryRoutingModule,
        FormsModule,
        MzIconMdiModule,
        MzSpinnerModule,
        SimpleNotificationsModule.forRoot(),
        JasperoAlertsModule,
        ReactiveFormsModule,
        MzInputModule,
        MzValidationModule,
        MzButtonModule,
        MzInjectionModule,
        MzModalModule,
        MzSpinnerModule
    ],
    declarations: [RecoveryComponent, AlertComponent],
    entryComponents: [AlertComponent]
})
export class RecoveryModule {}
