import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AssignmentComponent } from './admin/assignment/assignment.component';
import { ClassCompleteComponent } from './admin/class-complete/class-complete.component';
import { DetailClassCompleteComponent } from './admin/detail-class-complete/detail-class-complete.component';
import { DetailClassComponent } from './admin/detail-class/detail-class.component';
import { DetailContactComponent } from './admin/detail-contact/detail-contact.component';
import { DetailExamComponent } from './admin/detail-exam/detail-exam.component';
import { DetailResultComponent } from './admin/detail-result/detail-result.component';
import { DetailStudentComponent } from './admin/detail-student/detail-student.component';
import { DetailTeacherComponent } from './admin/detail-teacher/detail-teacher.component';
import { ListClassComponent } from './admin/list-class/list-class.component';
import { ListContactComponent } from './admin/list-contact/list-contact.component';
import { ListCourseComponent } from './admin/list-course/list-course.component';
import { ListExamComponent } from './admin/list-exam/list-exam.component';
import { ListNewsComponent } from './admin/list-news/list-news.component';
import { DetailNewsComponent } from './user/detail-news/detail-news.component';
import { ListRegisComponent } from './admin/list-regis/list-regis.component';
import { ListStudentComponent } from './admin/list-student/list-student.component';
import { ListTeacherComponent } from './admin/list-teacher/list-teacher.component';
import { ListUserComponent } from './admin/list-user/list-user.component';
import { LoginAdminComponent } from './admin/login-admin/login-admin.component';
// import { StatisticCourseComponent } from './admin/statistic-course/statistic-course.component';
import { StatisticComponent } from './admin/statistic/statistic.component';
import { Statistic1Component } from './admin/statistic1/statistic1.component';
import { TimeTableComponent } from './admin/time-table/time-table.component';
import { AuthGuard } from './auth.guard';
import { AddUserComponent } from './form/add-user/add-user.component';
import { ClassComponent } from './form/class/class.component';
import { CourseComponent } from './form/course/course.component';
import { RegisClassComponent } from './form/regis-class/regis-class.component';
import { ScheduleComponent } from './form/schedule/schedule.component';
import { StudentComponent } from './form/student/student.component';
import { TeacherComponent } from './form/teacher/teacher.component';

import { IndexComponent } from './index/index.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AttendanceComponent } from './user/attendance/attendance.component';
import { ChangPassComponent } from './user/chang-pass/chang-pass.component';
import { ChangeInfoComponent } from './user/change-info/change-info.component';
import { ClassDiariesComponent } from './user/class-diaries/class-diaries.component';
import { ClassListStudentComponent } from './user/class-list-student/class-list-student.component';
import { ClassManageComponent } from './user/class-manage/class-manage.component';
import { ClassResultComponent } from './user/class-result/class-result.component';
import { ClassScheduleComponent } from './user/class-schedule/class-schedule.component';
import { ClassTeacherComponent } from './user/class-teacher/class-teacher.component';
import { ContactComponent } from './user/contact/contact.component';
import { CourseB1Component } from './user/coure/course-b1/course-b1.component';
import { CourseB2Component } from './user/coure/course-b2/course-b2.component';
import { CourseC1Component } from './user/coure/course-c1/course-c1.component';
import { DetailDiariesComponent } from './user/detail-diaries/detail-diaries.component';
import { DiariesComponent } from './user/diaries/diaries.component';
import { InfoAccountComponent } from './user/info-account/info-account.component';
import { IntroduceComponent } from './user/introduce/introduce.component';
import { LoginComponent } from './user/login/login.component';
import { NotificationComponent } from './user/notification/notification.component';
import { QuestionComponent } from './user/question/question.component';
import { RegisComponent } from './user/regis/regis.component';
import { VerifyComponent } from './user/verify/verify.component';
import { Statistic2Component } from './admin/statistic2/statistic2.component';
import { Statistic3Component } from './admin/statistic3/statistic3.component';
import { ConfigComponent } from './admin/config/config.component';
import { SearchNewComponent } from './user/search-new/search-new.component';



const routes: Routes = [
  {path: 'home', component: IndexComponent},
  {path: 'front/introduce', component: IntroduceComponent},
  {path: 'front/login', component: LoginComponent},
  {path: 'front/regis', component: RegisComponent},
  {path: 'front/contact', component: ContactComponent},
  {path: 'front/question', component: QuestionComponent},
  {path: 'front/search/:search', component: SearchNewComponent},
  // {path: 'front/course/b1', component: CourseB1Component},
  // {path: 'front/course/b2', component: CourseB2Component},
  {path: 'front/course/:name', component: CourseC1Component},
  {path: 'front/detail', component: InfoAccountComponent},
  {path: 'front/authen', component: VerifyComponent},
  {path: 'front/change', component: ChangPassComponent},
  {path: 'front/update', component: ChangeInfoComponent},
  {path: 'front/class/manage', component: ClassManageComponent},
  {path: 'front/class/:id', component: ClassTeacherComponent},
  {path: 'front/class/schedule/:id', component: ClassScheduleComponent},
  {path: 'front/class/student/:id', component: ClassListStudentComponent},
  {path: 'front/class/result/:id', component: ClassResultComponent},
  {path: 'front/class/diaries/:id', component: ClassDiariesComponent},
  {path: 'front/class/diaries/detail/:id', component: DetailDiariesComponent},
  {path: 'front/class/diaries/add/:id', component: DiariesComponent},
  {path: 'front/class/atten/:id', component: AttendanceComponent},
  {path: 'front/class/add/:id', component: NotificationComponent},
  {path: 'front/class/update/:no_id', component: NotificationComponent},
  {path: 'front/news/:id', component: DetailNewsComponent},
  {path: 'front/school', component: InfoAccountComponent},
  {path: 'admin/login', component: LoginAdminComponent},
  {path: 'admin/trangchu', component: StatisticComponent, canActivate: [AuthGuard]},
  {path: 'admin/user', component: ListUserComponent, canActivate: [AuthGuard]},
  {path: 'admin/user/add', component: AddUserComponent, canActivate: [AuthGuard]},
  {path: 'admin/user/edit/:id', component: AddUserComponent, canActivate: [AuthGuard]},
  {path: 'admin/course', component: ListCourseComponent, canActivate: [AuthGuard]},
  {path: 'admin/course/add', component: CourseComponent, canActivate: [AuthGuard]},
  {path: 'admin/course/edit/:id', component: CourseComponent, canActivate: [AuthGuard]},
  {path: 'admin/teacher', component: ListTeacherComponent, canActivate: [AuthGuard]},
  {path: 'admin/teacher/add', component: TeacherComponent, canActivate: [AuthGuard]},
  {path: 'admin/teacher/edit/:id', component: TeacherComponent, canActivate: [AuthGuard]},
  {path: 'admin/teacher/detail/:id', component: DetailTeacherComponent, canActivate: [AuthGuard]},
  {path: 'admin/student', component: ListStudentComponent, canActivate: [AuthGuard]},
  {path: 'admin/student/add', component: StudentComponent, canActivate: [AuthGuard]},
  {path: 'admin/student/edit/:id', component: StudentComponent, canActivate: [AuthGuard]},
  {path: 'admin/student/detail/:id', component: DetailStudentComponent, canActivate: [AuthGuard]},
  {path: 'admin/student/regist', component: ListRegisComponent, canActivate: [AuthGuard]},
  {path: 'admin/class', component: ListClassComponent, canActivate: [AuthGuard]},
  {path: 'admin/class/regis/:id', component: RegisClassComponent, canActivate: [AuthGuard]},
  {path: 'admin/class/regis/:id/:de_id', component: RegisClassComponent, canActivate: [AuthGuard]},
  {path: 'admin/class/add', component: ClassComponent, canActivate: [AuthGuard]},
  {path: 'admin/class/complete', component: ClassCompleteComponent, canActivate: [AuthGuard]},
  {path: 'admin/class/complete/:id', component: DetailClassCompleteComponent, canActivate: [AuthGuard]},
  {path: 'admin/class/diaries/:id', component: DetailClassCompleteComponent, canActivate: [AuthGuard]},
  {path: 'admin/class/edit/:id', component: ClassComponent, canActivate: [AuthGuard]},
  {path: 'admin/class/detail/:id', component: DetailClassComponent, canActivate: [AuthGuard]},
  {path: 'admin/class/student/:id', component: DetailResultComponent, canActivate: [AuthGuard]},
  {path: 'admin/timetable/:id', component: TimeTableComponent, canActivate: [AuthGuard]},
  {path: 'admin/schedule/:id', component: ScheduleComponent, canActivate: [AuthGuard]},
  {path: 'admin/assignment', component: AssignmentComponent, canActivate: [AuthGuard]},
  {path: 'admin/contact', component: ListContactComponent, canActivate: [AuthGuard]},
  {path: 'admin/contact/:id', component: DetailContactComponent, canActivate: [AuthGuard]},
  {path: 'admin/news', component: ListNewsComponent, canActivate: [AuthGuard]},
  {path: 'admin/exam', component: ListExamComponent, canActivate: [AuthGuard]},
  {path: 'admin/exam/:id', component: DetailExamComponent, canActivate: [AuthGuard]},
  {path: 'admin/statistic', component: StatisticComponent, canActivate: [AuthGuard]},
  // {path: 'admin/statistic/course', component: StatisticCourseComponent, canActivate: [AuthGuard]},
  {path: 'admin/statistic1', component: Statistic1Component, canActivate: [AuthGuard]},
  {path: 'admin/statistic2', component: Statistic2Component, canActivate: [AuthGuard]},
  {path: 'admin/statistic3', component: Statistic3Component, canActivate: [AuthGuard]},
  {path: 'admin/config', component: ConfigComponent, canActivate: [AuthGuard]},
  {path: '', redirectTo: 'home', pathMatch:'full'},
  {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      onSameUrlNavigation: 'reload',
      scrollPositionRestoration: 'enabled',
    }),
    CommonModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
