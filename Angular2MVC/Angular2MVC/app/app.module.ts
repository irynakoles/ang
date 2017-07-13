import { NgModule, ErrorHandler } from '@angular/core';
import { APP_BASE_HREF } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { Ng2Bs3ModalModule } from 'ng2-bs3-modal/ng2-bs3-modal';
import { HttpModule } from '@angular/http';
import { routing } from './app.routing';
import { UserComponent } from './components/user.component';
import { HomeComponent } from './components/home.component';
import { UserService } from './Service/user.service';
import { CourseService } from './Service/course.service';
import { UserFilterPipe } from './filter/user.pipe';
import { CourseFilterPipe } from './filter/course.pipe';
import { SearchComponent } from './Shared/search.component';
import { CourseComponent } from './components/course.component';

import { OrderModule } from 'ngx-order-pipe';

import AppErrorHandler from './Shared/errorhandler';
@NgModule({
    imports: [BrowserModule, ReactiveFormsModule, HttpModule, routing, Ng2Bs3ModalModule, FormsModule, OrderModule],
    declarations: [AppComponent, UserComponent, HomeComponent, UserFilterPipe, CourseFilterPipe, SearchComponent, CourseComponent],
    providers: [{ provide: ErrorHandler, useClass: AppErrorHandler }, { provide: APP_BASE_HREF, useValue: '/' }, UserService, CourseService],
    bootstrap: [AppComponent]

})
export class AppModule { }
{ }