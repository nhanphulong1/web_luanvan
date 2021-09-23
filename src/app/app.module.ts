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