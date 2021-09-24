import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IndexComponent } from './index/index.component';
import { ContactComponent } from './user/contact/contact.component';
import { CourseB1Component } from './user/coure/course-b1/course-b1.component';
import { CourseB2Component } from './user/coure/course-b2/course-b2.component';
import { CourseC1Component } from './user/coure/course-c1/course-c1.component';
import { IntroduceComponent } from './user/introduce/introduce.component';
import { QuestionComponent } from './user/question/question.component';



const routes: Routes = [
  {path: 'home', component: IndexComponent},
  {path: 'front/introduce', component: IntroduceComponent},
  {path: 'front/contact', component: ContactComponent},
  {path: 'front/question', component: QuestionComponent},
  {path: 'front/course/b1', component: CourseB1Component},
  {path: 'front/course/b2', component: CourseB2Component},
  {path: 'front/course/c1', component: CourseC1Component},
  {path: '', redirectTo: 'home', pathMatch:'full'},
  {path: '**', redirectTo: 'home', pathMatch:'full'}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    CommonModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
