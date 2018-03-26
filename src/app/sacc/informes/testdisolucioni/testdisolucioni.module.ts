import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TestdisolucioniRoutingModule } from './testdisolucioni-routing.module';
import { TestdisolucioniComponent } from './testdisolucioni.component';

@NgModule({
    imports: [
        CommonModule,
        TestdisolucioniRoutingModule
    ],
    declarations: [TestdisolucioniComponent]
})


export class TestdisolucioniModule {}
