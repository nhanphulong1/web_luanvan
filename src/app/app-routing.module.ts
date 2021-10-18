import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AssignmentComponent } from './admin/assignment/assignment.component';
import { DetailClassComponent } from './admin/detail-class/detail-class.component';
import { DetailTeacherComponent } from './admin/detail-teacher/detail-teacher.component';
import { ListClassComponent } from './admin/list-class/list-class.component';
import { ListCourseComponent } from './admin/list-course/list-course.component';
import { ListRegisComponent } from './admin/list-regis/list-regis.component';
import { ListStudentComponent } from './admin/list-student/list-student.component';
import { ListTeacherComponent } from './admin/list-teacher/list-teacher.component';
import { ListUserComponent } from './admin/list-user/list-user.component';
import { LoginAdminComponent } from './admin/login-admin/login-admin.component';
import { StatisticCourseComponent } from './admin/statistic-course/statistic-course.component';
import { StatisticComponent } from './admin/statistic/statistic.component';
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
import { ContactComponent } from './user/contact/contact.component';
import { CourseB1Component } from './user/coure/course-b1/course-b1.component';
import { CourseB2Component } from './user/coure/course-b2/course-b2.component';
import { CourseC1Component } from './user/coure/course-c1/course-c1.component';
import { IntroduceComponent } from './user/introduce/introduce.component';
import { LoginComponent } from './user/login/login.component';
import { PaymentComponent } from './user/payment/payment.component';
import { QuestionComponent } from './user/question/question.component';
import { RegisComponent } from './user/regis/regis.component';



const routes: Routes = [
  {path: 'home', component: IndexComponent},
  {path: 'front/introduce', component: IntroduceComponent},
  {path: 'front/login', component: LoginComponent},
  {path: 'front/regis', component: RegisComponent},
  {path: 'front/contact', component: ContactComponent},
  {path: 'front/question', component: QuestionComponent},
  {path: 'front/course/b1', component: CourseB1Component},
  {path: 'front/course/b2', component: CourseB2Component},
  {path: 'front/course/c1', component: CourseC1Component},
  {path: 'front/payment', component: PaymentComponent},
  {path: 'admin/login', component: LoginAdminComponent},
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
  {path: 'admin/student/regist', component: ListRegisComponent, canActivate: [AuthGuard]},
  {path: 'admin/class', component: ListClassComponent, canActivate: [AuthGuard]},
  {path: 'admin/class/regis/:id', component: RegisClassComponent, canActivate: [AuthGuard]},
  {path: 'admin/class/regis/:id/:de_id', component: RegisClassComponent, canActivate: [AuthGuard]},
  {path: 'admin/class/add', component: ClassComponent, canActivate: [AuthGuard]},
  {path: 'admin/class/edit/:id', component: ClassComponent, canActivate: [AuthGuard]},
  {path: 'admin/class/detail/:id', component: DetailClassComponent, canActivate: [AuthGuard]},
  {path: 'admin/timetable/:id', component: TimeTableComponent, canActivate: [AuthGuard]},
  {path: 'admin/schedule/:id', component: ScheduleComponent, canActivate: [AuthGuard]},
  {path: 'admin/assignment', component: AssignmentComponent, canActivate: [AuthGuard]},
  {path: 'admin/statistic', component: StatisticComponent, canActivate: [AuthGuard]},
  {path: 'admin/statistic/course', component: StatisticCourseComponent, canActivate: [AuthGuard]},
  {path: '', redirectTo: 'home', pathMatch:'full'},
  {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      onSameUrlNavigation: 'reload',
    }),
    CommonModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
