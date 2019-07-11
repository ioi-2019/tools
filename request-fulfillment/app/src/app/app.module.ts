import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { LocationStrategy, PathLocationStrategy } from '@angular/common';

import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

import { AppComponent } from './app.component';

// Import containers
import { DefaultLayoutComponent } from './containers';

// Import container-based components
import { UsersComponent } from './views/users/users.component';
import { ActiveUsersComponent } from './views/users/active-users/active-users.component';
import { PendingUsersComponent } from './views/users/pending-users/pending-users.component';
import { TasksComponent } from './views/tasks/tasks.component';
import { PersonalTasksComponent } from './views/tasks/personal-tasks/personal-tasks.component';
import { PendingTasksComponent } from './views/tasks/pending-tasks/pending-tasks.component';
import { CompletedTasksComponent } from './views/tasks/completed-tasks/completed-tasks.component';
import { TaskEditComponent } from './views/task-edit/task-edit.component';
import { UserEditComponent } from './views/user-edit/user-edit.component';
import { TableUserStatusComponent } from './components/table-user-status/table-user-status.component';
import { TableUserRoleComponent } from './components/table-user-role/table-user-role.component';
import { TableTaskStatusComponent } from './components/table-task-status/table-task-status';

// Import container-free components
import { P404Component } from './views/error/404.component';
import { P500Component } from './views/error/500.component';
import { LoginComponent } from './views/login/login.component';
import { LogoutComponent } from './views/logout/logout.component';
import { RegisterComponent } from './views/register/register.component';

const APP_CONTAINERS = [
  DefaultLayoutComponent
];

import {
  AppAsideModule,
  AppBreadcrumbModule,
  AppHeaderModule,
  AppFooterModule,
  AppSidebarModule,
} from '@coreui/angular';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Import routing module
import { AppRoutingModule } from './app.routing';

// Import 3rd party components
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { ChartsModule } from 'ng2-charts/ng2-charts';

// Import services
import { ConstantsService } from './services/local-helpers/contants.service';
import { AuthStorageService } from './services/local-helpers/auth-storage.service';
import { APIService } from './services/api/api.service';
import { AuthService } from './services/api/auth.service';
import { UsersService } from './services/api/users.service';
import { TasksService } from './services/api/tasks.service';

// Import 3rd party service
import { NgxWebstorageModule } from 'ngx-webstorage';
import { Ng2SmartTableModule } from 'ng2-smart-table';


@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    AppAsideModule,
    AppBreadcrumbModule.forRoot(),
    AppFooterModule,
    AppHeaderModule,
    AppSidebarModule,
    PerfectScrollbarModule,
    BsDropdownModule.forRoot(),
    TabsModule.forRoot(),
    ChartsModule,
    NgxWebstorageModule.forRoot({
      prefix: 'cms-rf',
      caseSensitive: true
    }),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    Ng2SmartTableModule
  ],
  declarations: [
    AppComponent,
    ...APP_CONTAINERS,
    P404Component,
    P500Component,
    LoginComponent,
    LogoutComponent,
    RegisterComponent,
    UsersComponent,
    ActiveUsersComponent,
    PendingUsersComponent,
    TasksComponent,
    PersonalTasksComponent,
    PendingTasksComponent,
    CompletedTasksComponent,
    TaskEditComponent,
    UserEditComponent,
    TableUserStatusComponent,
    TableUserRoleComponent,
    TableTaskStatusComponent
  ],
  providers: [{
    provide: LocationStrategy,
    useClass: PathLocationStrategy
  },
    ConstantsService,
    AuthStorageService,
    APIService,
    AuthService,
    UsersService,
    TasksService
  ],
  entryComponents: [
    TableUserStatusComponent,
    TableUserRoleComponent,
    TableTaskStatusComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
