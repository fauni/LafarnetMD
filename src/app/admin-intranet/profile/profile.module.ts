import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
    MzDropdownModule,
    MzSwitchModule,
    MzParallaxModule,
    MzButtonModule,
    MzIconModule,
    MzIconMdiModule,
    MzCardModule,
    MzModalModule,
    MzInputModule,
    MzValidationModule,
    MzSelectModule
 } from 'ng2-materialize';


import { FormsModule } from '@angular/forms';
import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile.component';
import { SimpleNotificationsModule } from 'angular2-notifications';
import { Ng2CompleterModule } from 'ng2-completer';


@NgModule({
    imports: [
        CommonModule,
        SimpleNotificationsModule.forRoot(),
        ProfileRoutingModule,
        MzDropdownModule,
        MzSelectModule,
        MzSwitchModule,
        MzButtonModule,
        MzIconMdiModule,
        MzParallaxModule,
        MzCardModule,
        MzButtonModule,
        MzIconModule,
        MzInputModule,
        MzModalModule,
        MzValidationModule,
        FormsModule,
        Ng2CompleterModule
    ],
    declarations: [
        ProfileComponent
    ]
})
export class ProfileModule {}
