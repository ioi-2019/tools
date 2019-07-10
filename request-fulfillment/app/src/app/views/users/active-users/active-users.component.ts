import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../../services/api/users.service';
import { AuthStorageService } from '../../../services/local-helpers/auth-storage.service';
import { LocalDataSource } from 'ng2-smart-table';
import { TableUserRoleComponent } from '../../../components/table-user-role/table-user-role.component';

@Component({
  selector: 'app-active-users',
  templateUrl: './active-users.component.html',
  styleUrls: ['./active-users.component.scss']
})
export class ActiveUsersComponent implements OnInit {

  activeUsers: LocalDataSource;
  tableSettings = {};

  constructor(
    private usersService: UsersService,
    private authStorageService: AuthStorageService
  ) {
    this.activeUsers = new LocalDataSource();
  }

  ngOnInit() {
    this.updateTableSettings();
    this.loadTableData();
  }

  private loadTableData() {
    const username = this.authStorageService.getUsername();
    const authToken = this.authStorageService.getAuthToken();
    this.usersService.getActiveUsers({
      username: username,
      auth_token: authToken
    })
      .then((res) => {
        if (res.status === 'success') {
          this.activeUsers.load(res.data.users);
        }
      });
  }

  private updateTableSettings() {
    const settings = {
      actions: false,
      columns: {
        id: {
          title: 'ID',
          width: '100px',
        },
        username: {
          title: 'Username'
        },
        first_name: {
          title: 'First Name'
        },
        last_name: {
          title: 'Last Name'
        },
        is_admin: {
          title: 'Role',
          type: 'html',
          filter: false,
          valuePrepareFunction: (cell, row) => {
            if (row.is_admin === true) {
              return `<div class="col-12 text-center"><h5><span class="badge badge-success">ADMIN</span></h5></div>`;
            } else {
              return `<div class="col-12 text-center"><h5><span class="badge badge-secondary">USER</span></h5></div>`;
            }
          }
        },
        action: {
          title: 'Action',
          width: '250px',
          type: 'custom',
          filter: false,
          renderComponent: TableUserRoleComponent,
          onComponentInitFunction: (instance) => {
            instance.save.subscribe(row => {
              this.activeUsers.update(row, { is_admin: !row.is_admin });
              // this.pendingUsers.refresh();
              // this.loadTableData();
            });
          }
        }
      }
    };
    this.tableSettings = Object.assign({}, settings);
  }

}
