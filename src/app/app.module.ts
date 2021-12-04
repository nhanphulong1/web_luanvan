import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
// import { ChartsModule } from 'ng2-charts';
import { ChartsModule } from 'ng2-charts';
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
import { MatStepperModule } from '@angular/material/stepper';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatChipsModule } from '@angular/material/chips';

// Firebase services + enviorment module
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';

import { environment } from '../environments/environment'

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
import { ListStudentComponent } from './admin/list-student/list-student.component';
import { StudentComponent } from './form/student/student.component';
import { ClassComponent } from './form/class/class.component';
import { DetailClassComponent } from './admin/detail-class/detail-class.component';
import { TimeTableComponent } from './admin/time-table/time-table.component';
import { ScheduleComponent } from './form/schedule/schedule.component';
import { RegisClassComponent } from './form/regis-class/regis-class.component';
import { AssignmentComponent } from './admin/assignment/assignment.component';
import { StatisticComponent } from './admin/statistic/statistic.component';
import { DialogResultComponent } from './form/dialog-result/dialog-result.component';
// import { StatisticCourseComponent } from './admin/statistic-course/statistic-course.component';
import { LoginAdminComponent } from './admin/login-admin/login-admin.component';
import { DetailStudentComponent } from './admin/detail-student/detail-student.component';
import { InfoAccountComponent } from './user/info-account/info-account.component';
import { ChangPassComponent } from './user/chang-pass/chang-pass.component';
import { ChangeInfoComponent } from './user/change-info/change-info.component';
import { VerifyComponent } from './user/verify/verify.component';
import { PermissionComponent } from './form/permission/permission.component';
import { HomeAdminComponent } from './admin/home-admin/home-admin.component';
import { ListContactComponent } from './admin/list-contact/list-contact.component';
import { ClassManageComponent } from './user/class-manage/class-manage.component';
import { ClassTeacherComponent } from './user/class-teacher/class-teacher.component';
import { ClassScheduleComponent } from './user/class-schedule/class-schedule.component';
import { ClassListStudentComponent } from './user/class-list-student/class-list-student.component';
import { NotificationComponent } from './user/notification/notification.component';
import { QuillModule } from 'ngx-quill';
import { ClassResultComponent } from './user/class-result/class-result.component';
import { DetailContactComponent } from './admin/detail-contact/detail-contact.component';
import { DetailResultComponent } from './admin/detail-result/detail-result.component';
import { DiariesComponent } from './user/diaries/diaries.component';
import { CardClassComponent } from './user/card-class/card-class.component';
import { ClassDiariesComponent } from './user/class-diaries/class-diaries.component';
import { AttendanceComponent } from './user/attendance/attendance.component';
import { DetailDiariesComponent } from './user/detail-diaries/detail-diaries.component';
import { ClassCompleteComponent } from './admin/class-complete/class-complete.component';
import { DetailClassCompleteComponent } from './admin/detail-class-complete/detail-class-complete.component';
import { Statistic1Component } from './admin/statistic1/statistic1.component';
import { Statistic2Component } from './admin/statistic2/statistic2.component';
import { PaymentComponent } from './form/payment/payment.component';
import { ListExamComponent } from './admin/list-exam/list-exam.component';
import { ExamComponent } from './form/exam/exam.component';
import { DetailExamComponent } from './admin/detail-exam/detail-exam.component';
import { ListNewsComponent } from './admin/list-news/list-news.component';
import { NewsComponent } from './form/news/news.component';
import { DetailNewsComponent } from './user/detail-news/detail-news.component';
import { Statistic3Component } from './admin/statistic3/statistic3.component';
import { ConfigComponent } from './admin/config/config.component';

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
    ListStudentComponent,
    StudentComponent,
    ClassComponent,
    DetailClassComponent,
    TimeTableComponent,
    ScheduleComponent,
    RegisClassComponent,
    AssignmentComponent,
    StatisticComponent,
    DialogResultComponent,
    // StatisticCourseComponent,
    LoginAdminComponent,
    DetailStudentComponent,
    InfoAccountComponent,
    ChangPassComponent,
    ChangeInfoComponent,
    VerifyComponent,
    PermissionComponent,
    HomeAdminComponent,
    ListContactComponent,
    ClassManageComponent,
    ClassTeacherComponent,
    ClassScheduleComponent,
    ClassListStudentComponent,
    NotificationComponent,
    ClassResultComponent,
    DetailContactComponent,
    DetailResultComponent,
    DiariesComponent,
    CardClassComponent,
    ClassDiariesComponent,
    AttendanceComponent,
    DetailDiariesComponent,
    ClassCompleteComponent,
    DetailClassCompleteComponent,
    Statistic1Component,
    Statistic2Component,
    PaymentComponent,
    ListExamComponent,
    ExamComponent,
    DetailExamComponent,
    ListNewsComponent,
    NewsComponent,
    DetailNewsComponent,
    Statistic3Component,
    ConfigComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    ChartsModule,
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
    MatStepperModule,
    MatCheckboxModule,
    MatAutocompleteModule,
    MatChipsModule,
    QuillModule.forRoot(),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
  ],
  exports:[
    FrontHeaderComponent,
    FrontFooterComponent,
    BreadcrumbComponent,
    FormRegisComponent,
    SidenavComponent,
    ToolbarComponent,
    BackFooterComponent,
    MatStepperModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: Interceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }