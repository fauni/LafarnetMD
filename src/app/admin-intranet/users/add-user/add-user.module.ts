import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddUserRoutingModule } from './add-uder.routing.module';
import { AddUserComponent } from './add-user.component';
import {
  MzDropdownModule,
  MzSwitchModule,
  MzParallaxModule,
  MzButtonModule,
  MzIconModule,
  MzIconMdiModule,
  MzCardModule
} from 'ng2-materialize';

@NgModule({
  imports: [
    CommonModule,
    AddUserRoutingModule,
    MzDropdownModule,
    MzSwitchModule,
    MzButtonModule,
    MzIconMdiModule,
    MzParallaxModule,
    MzCardModule,
    MzButtonModule,
    MzIconModule
  ],
  declarations: [AddUserComponent]
})
export class AddUserModule { }
