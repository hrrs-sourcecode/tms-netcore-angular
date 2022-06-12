import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListTenderComponent } from './views/tender/list-tender.component';
import { CreateTenderComponent } from './views/tender/create-tender.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BsDatepickerModule, BsDatepickerConfig  } from 'ngx-bootstrap/datepicker';
import { TenderService } from './services/tender.service';
import { TenderScalePipe } from './pipes/tender-scale.pipe';
import { EditTenderComponent } from './views/tender/edit-tender.component';
import { DetailsTenderComponent } from './views/tender/details-tender.component';
import { TenderIdPipe } from './pipes/tender-id.pipe';
import { NavMenuComponent } from './views/nav/nav-menu.component';
import { UserService } from './services/user.service';
import { UserLoginComponent } from './views/user/user-login.component';
import { HomeComponent } from './views/home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    ListTenderComponent,
    CreateTenderComponent,
    EditTenderComponent,
    DetailsTenderComponent,
    UserLoginComponent,
    TenderScalePipe,
    TenderIdPipe,
    NavMenuComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    BsDatepickerModule.forRoot(),
    ReactiveFormsModule
  ],
  providers: [BsDatepickerConfig, TenderService, UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
