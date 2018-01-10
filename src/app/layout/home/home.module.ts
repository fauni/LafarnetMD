import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { MzModalModule,
    MzNavbarModule,
    MzInputModule,
    MzIconModule,
    MzValidationModule,
    MzDatepickerModule,
    MzSpinnerModule,
    MzCardModule,
    MzIconMdiModule} from 'ng2-materialize';
import { CodeSnippetModule } from '../shared/code-snippet/code-snippet.module';
import { NgxSmartModalModule, NgxSmartModalService } from 'ngx-smart-modal';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeService } from './home.service';
import { ListaPublicacionComponent } from './lista-publicacion/lista-publicacion.component';
import { LoadingComponent } from '../components/loading/loading.component';
import { SimpleNotificationsModule, NotificationsService } from 'angular2-notifications';

@NgModule({
    imports: [
        CommonModule,
        HomeRoutingModule,
        MzModalModule,
        MzNavbarModule,
        MzInputModule,
        MzIconModule,
        MzIconMdiModule,
        CodeSnippetModule,
        NgxSmartModalModule,
        FormsModule,
        ReactiveFormsModule,
        MzValidationModule,
        MzDatepickerModule,
        MzSpinnerModule,
        MzCardModule,
        SimpleNotificationsModule.forRoot()
    ],
    declarations: [
        HomeComponent,
        ListaPublicacionComponent,
        LoadingComponent
    ],
    providers: [
        NgxSmartModalService, HomeService, NotificationsService
    ]
})
export class HomeModule {}
