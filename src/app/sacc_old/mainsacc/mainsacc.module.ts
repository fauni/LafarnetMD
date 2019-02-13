import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainsaccRoutingModule } from './mainsacc-routing.module';
import { MainsaccComponent } from './mainsacc.component';
import { MzParallaxModule, MzCardModule } from 'ng2-materialize';
import { CodeSnippetModule } from '../../layout/shared/code-snippet/code-snippet.module';
import { PropertiesTableModule } from '../../layout/shared/properties-table/properties-table.module';

@NgModule({
    imports: [
        CommonModule,
        MainsaccRoutingModule,
        MzParallaxModule,
        MzCardModule,
        CodeSnippetModule,
        PropertiesTableModule
    ],
    declarations: [
        MainsaccComponent
    ]
})
export class MainsaccModule {}
