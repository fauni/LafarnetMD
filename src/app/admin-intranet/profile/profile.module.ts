import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { 
    MzDropdownModule,
    MzSwitchModule,
    MzParallaxModule,
    MzButtonModule,
    MzIconModule,
    MzIconMdiModule,
    MzCardModule
 } from 'ng2-materialize';

import { FormsModule } from '@angular/forms';
import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile.component';


@NgModule({
    imports: [
        CommonModule,
        ProfileRoutingModule,
        MzDropdownModule,
        MzSwitchModule,
        MzButtonModule,
        MzIconMdiModule,
        MzParallaxModule,
        MzCardModule,
        MzButtonModule,
        MzIconModule,
        FormsModule
    ],
    declarations: [
        ProfileComponent
    ]
})
export class ProfileModule {}
