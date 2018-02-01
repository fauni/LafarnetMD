import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddUserRoutingModule } from './add-uder.routing.module';
import { AddUserComponent } from './add-user.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {
  MzDropdownModule,
  MzSwitchModule,
  MzParallaxModule,
  MzButtonModule,
  MzIconModule,
  MzIconMdiModule,
  MzCardModule,
  MzInputModule,
  MzValidationModule,
  MzSelectModule
} from 'ng2-materialize';

import { Ng4FilesModule } from '../../../ng4-files';


@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    Ng4FilesModule,
    AddUserRoutingModule,
    MzDropdownModule,
    MzSwitchModule,
    MzButtonModule,
    MzIconMdiModule,
    MzParallaxModule,
    MzCardModule,
    MzButtonModule,
    MzIconModule,
    MzInputModule,
    MzSelectModule,
    MzValidationModule
  ],
  declarations: [AddUserComponent]
})
export class AddUserModule { }
