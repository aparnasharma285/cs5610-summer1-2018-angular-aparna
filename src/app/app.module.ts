import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {FormsModule} from "@angular/forms";
import {CourseNavigatorServiceClient} from "./services/course-navigator.service.client";
import { CourseNavigatorComponent } from './course-navigator/course-navigator.component';
import { WhiteBoardComponent } from './white-board/white-board.component';
import { CourseGridComponent } from './course-grid/course-grid.component';
import {CourseServiceClient} from "./services/course.service.client";
import {routing} from "./app.routing";
import { CourseViewerComponent } from './course-viewer/course-viewer.component';
import { ModuleListComponent } from './module-list/module-list.component';
import {ModuleServiceClient} from "./services/module.service.client";
import { LessonTabsComponent } from './lesson-tabs/lesson-tabs.component';
import {LessonServiceClient} from "./services/lesson.service.client";
import { WidgetListComponent } from './widget-list/widget-list.component';
import {WidgetServiceClient} from "./services/widget.service.client";
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ProfileComponent } from './profile/profile.component';
import {UserServiceClient} from "./services/user.service.client";
import { SectionListComponent } from './section-list/section-list.component';
import {SectionServiceClient} from "./services/section.service.client";
import { AdminPageComponent } from './admin-page/admin-page.component';
import { HeaderComponent } from './header/header.component';
import { UserCoursesComponent } from './user-courses/user-courses.component';
import { TopicListComponent } from './topic-list/topic-list.component';
import {TopicServiceClient} from "./services/topic.service.client";


@NgModule({
  declarations: [
    AppComponent,
    CourseNavigatorComponent,
    WhiteBoardComponent,
    CourseGridComponent,
    CourseViewerComponent,
    ModuleListComponent,
    LessonTabsComponent,
    WidgetListComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    SectionListComponent,
    AdminPageComponent,
    HeaderComponent,
    UserCoursesComponent,
    TopicListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    routing
  ],
  providers: [
    CourseNavigatorServiceClient,
    CourseServiceClient,
    ModuleServiceClient,
    LessonServiceClient,
    WidgetServiceClient,
    UserServiceClient,
    SectionServiceClient,
    TopicServiceClient
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
