import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MzDropdownModule, MzSwitchModule, MzParallaxModule, MzButtonModule, MzIconMdiModule } from 'ng2-materialize';
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
        FormsModule
    ],
    declarations: [
        ProfileComponent
    ]
})
export class ProfileModule {}
