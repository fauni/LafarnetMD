import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListUserRoutingModule } from './list-user-routing.module';
import { ListUserComponent } from './list-user.component';

@NgModule({
  imports: [
    CommonModule,
    ListUserRoutingModule
  ],
  declarations: [ListUserComponent]
})
export class ListUserModule { }