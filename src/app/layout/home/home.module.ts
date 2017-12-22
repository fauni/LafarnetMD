import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { MzModalModule,
    MzNavbarModule,
    MzInputModule,
    MzIconModule,
    MzValidationModule,
    MzDatepickerModule } from 'ng2-materialize';
import { CodeSnippetModule } from '../shared/code-snippet/code-snippet.module';
import { NgxSmartModalModule, NgxSmartModalService } from 'ngx-smart-modal';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
    imports: [
        CommonModule,
        HomeRoutingModule,
        MzModalModule,
        MzNavbarModule,
        MzInputModule,
        MzIconModule,
        CodeSnippetModule,
        NgxSmartModalModule,
        FormsModule,
        ReactiveFormsModule,
        MzValidationModule,
        MzDatepickerModule
    ],
    declarations: [
        HomeComponent
    ],
    providers: [
        NgxSmartModalService
    ]
})
export class HomeModule {}
