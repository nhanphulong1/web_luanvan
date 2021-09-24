import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatGridListModule } from '@angular/material/grid-list';
import {MatExpansionModule} from '@angular/material/expansion';
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
    MatInputModule,
    MatExpansionModule,
  ],
  exports:[
    FrontHeaderComponent,
    FrontFooterComponent,
    BreadcrumbComponent,
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }