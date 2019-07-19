import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Import Containers
import { DefaultLayoutComponent } from './containers';

import { P404Component } from './views/error/404.component';
import { P500Component } from './views/error/500.component';
import { LoginComponent } from './views/login/login.component';
import { RegisterComponent } from './views/register/register.component';
import { UsersComponent } from './views/users/users.component';
import { TasksComponent } from './views/tasks/tasks.component';
import { TaskComponent } from './views/task/task.component';
import { UserEditComponent } from './views/user-edit/user-edit.component';
import { LogoutComponent } from './views/logout/logout.component';
import { ActiveUsersComponent } from './views/users/active-users/active-users.component';
import { PendingUsersComponent } from './views/users/pending-users/pending-users.component';
import { PersonalTasksComponent } from './views/tasks/personal-tasks/personal-tasks.component';
import { PendingTasksComponent } from './views/tasks/pending-tasks/pending-tasks.component';
import { CompletedTasksComponent } from './views/tasks/completed-tasks/completed-tasks.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: '',
    component: DefaultLayoutComponent,
    data: {
      title: 'Home'
    },
    children: [
      {
        path: 'users',
        component: UsersComponent,
        data: {
          title: 'Users'
        }
      },
      {
        path: 'active-users',
        component: ActiveUsersComponent,
        data: {
          title: 'Active Users'
        }
      },
      {
        path: 'pending-users',
        component: PendingUsersComponent,
        data: {
          title: 'Pending Users'
        }
      },
      {
        path: 'tasks',
        component: TasksComponent,
        data: {
          title: 'Tasks'
        }
      },
      {
        path: 'personal-tasks',
        component: PersonalTasksComponent,
        data: {
          title: 'Personal Tasks'
        }
      },
      {
        path: 'pending-tasks',
        component: PendingTasksComponent,
        data: {
          title: 'Pending Tasks'
        }
      },
      {
        path: 'completed-tasks',
        component: CompletedTasksComponent,
        data: {
          title: 'Completed Tasks'
        }
      },
      {
        path: 'task/:id',
        component: TaskComponent,
        data: {
          title: 'Task'
        }
      },
      {
        path: 'user-edit',
        component: UserEditComponent,
        data: {
          title: 'Edit User'
        }
      },
      {
        path: 'base',
        loadChildren: './views/base/base.module#BaseModule'
      },
      {
        path: 'buttons',
        loadChildren: './views/buttons/buttons.module#ButtonsModule'
      },
      {
        path: 'charts',
        loadChildren: './views/chartjs/chartjs.module#ChartJSModule'
      },
      {
        path: 'dashboard',
        loadChildren: './views/dashboard/dashboard.module#DashboardModule'
      },
      {
        path: 'icons',
        loadChildren: './views/icons/icons.module#IconsModule'
      },
      {
        path: 'notifications',
        loadChildren: './views/notifications/notifications.module#NotificationsModule'
      },
      {
        path: 'theme',
        loadChildren: './views/theme/theme.module#ThemeModule'
      },
      {
        path: 'widgets',
        loadChildren: './views/widgets/widgets.module#WidgetsModule'
      }
    ]
  },
  {
    path: '404',
    component: P404Component,
    data: {
      title: 'Page 404'
    }
  },
  {
    path: '500',
    component: P500Component,
    data: {
      title: 'Page 500'
    }
  },
  {
    path: 'login',
    component: LoginComponent,
    data: {
      title: 'Login'
    }
  },
  {
    path: 'logout',
    component: LogoutComponent,
    data: {
      title: 'Logout'
    }
  },
  {
    path: 'register',
    component: RegisterComponent,
    data: {
      title: 'Register'
    }
  },
  { path: '**', component: P404Component }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
