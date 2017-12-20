import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { MzModalModule, MzNavbarModule, MzInputModule, MzIconModule } from 'ng2-materialize';
import { CodeSnippetModule } from '../shared/code-snippet/code-snippet.module';

@NgModule({
    imports: [
        CommonModule,
        HomeRoutingModule,
        MzModalModule,
        MzNavbarModule,
        MzInputModule,
        MzIconModule,
        CodeSnippetModule
    ],
    declarations: [
        HomeComponent
    ]
})
export class HomeModule {}
