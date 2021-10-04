import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatDialogModule } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { MatTableModule } from '@angular/material/table';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatRadioModule } from '@angular/material/radio';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { FrontHeaderComponent } from './layout/front-header/front-header.component';
import { IndexComponent } from './index/index.component';
import { FrontFooterComponent } from './layout/front-footer/front-footer.component';
import { IntroduceComponent } from './user/introduce/introduce.component';
import { BreadcrumbComponent } from './layout/breadcrumb/breadcrumb.component';
import { ContactComponent } from './user/contact/contact.component';
import { QuestionComponent } from './user/question/question.component';
import { CourseB1Component } from './user/coure/course-b1/course-b1.component';
import { CourseB2Component } from './user/coure/course-b2/course-b2.component';
import { CourseC1Component } from './user/coure/course-c1/course-c1.component';
import { FormRegisComponent } from './user/form-regis/form-regis.component';
import { Interceptor } from './Interceptor';
import { RegisComponent } from './user/regis/regis.component';
import { LoginComponent } from './user/login/login.component';
import { ListUserComponent } from './admin/list-user/list-user.component';
import { SidenavComponent } from './layout/sidenav/sidenav.component';
import { ToolbarComponent } from './layout/toolbar/toolbar.component';
import { BackFooterComponent } from './layout/back-footer/back-footer.component';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { AddUserComponent } from './form/add-user/add-user.component';
import { ListCourseComponent } from './admin/list-course/list-course.component';
import { ListClassComponent } from './admin/list-class/list-class.component';
import { CourseComponent } from './form/course/course.component';
import { ListTeacherComponent } from './admin/list-teacher/list-teacher.component';
import { TeacherComponent } from './form/teacher/teacher.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { DetailTeacherComponent } from './admin/detail-teacher/detail-teacher.component';
import { ListRegisComponent } from './admin/list-regis/list-regis.component';

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    FrontHeaderComponent,
    IndexComponent,
    FrontFooterComponent,
    IntroduceComponent,
    BreadcrumbComponent,
    ContactComponent,
    QuestionComponent,
    CourseB1Component,
    CourseB2Component,
    CourseC1Component,
    FormRegisComponent,
    RegisComponent,
    LoginComponent,
    ListUserComponent,
    SidenavComponent,
    ToolbarComponent,
    BackFooterComponent,
    AddUserComponent,
    ListCourseComponent,
    ListClassComponent,
    CourseComponent,
    ListTeacherComponent,
    TeacherComponent,
    DetailTeacherComponent,
    ListRegisComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatGridListModule,
    MatButtonModule,
    MatIconModule,
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule,
    MatExpansionModule,
    MatDialogModule,
    MatToolbarModule,
    MatMenuModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatRadioModule,
  ],
  exports:[
    FrontHeaderComponent,
    FrontFooterComponent,
    BreadcrumbComponent,
    FormRegisComponent,
    SidenavComponent,
    ToolbarComponent,
    BackFooterComponent,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: Interceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }