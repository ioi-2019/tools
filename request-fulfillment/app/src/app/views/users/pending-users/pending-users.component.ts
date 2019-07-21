import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../../services/api/users.service';
import { AuthStorageService } from '../../../services/local-helpers/auth-storage.service';
import { LocalDataSource } from 'ng2-smart-table';
import { TableUserStatusComponent } from '../../../components/table-user-status/table-user-status.component';

@Component({
  selector: 'app-pending-users',
  templateUrl: './pending-users.component.html',
  styleUrls: ['./pending-users.component.scss']
})
export class PendingUsersComponent implements OnInit {

  pendingUsers: LocalDataSource;
  tableSettings = {};

  constructor(
    private usersService: UsersService,
    private authStorageService: AuthStorageService
  ) {
    this.pendingUsers = new LocalDataSource();
  }

  ngOnInit() {
    this.updateTableSettings();
    this.loadTableData();
  }

  private loadTableData() {
    const username = this.authStorageService.getUsername();
    const authToken = this.authStorageService.getAuthToken();
    this.usersService.getPendingUsers({
      username: username,
      auth_token: authToken
    })
      .then((res) => {
        if (res.status === 'success') {
          this.pendingUsers.load(res.data.users)
            .then(() => {
              this.pendingUsers.setPaging(1, 15, true);
            });
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
        actions: {
          title: 'Actions',
          width: '200px',
          type: 'custom',
          filter: false,
          renderComponent: TableUserStatusComponent,
          onComponentInitFunction: (instance) => {
            instance.save.subscribe(row => {
              this.pendingUsers.remove(row);
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
