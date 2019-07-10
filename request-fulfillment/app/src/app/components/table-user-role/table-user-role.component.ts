import { OnInit, Component, EventEmitter, Input, Output } from '@angular/core';
import { ViewCell } from 'ng2-smart-table';
import { AuthStorageService } from '../../services/local-helpers/auth-storage.service';
import { UsersService } from '../../services/api/users.service';

@Component({
  selector: 'app-table-user-role',
  template: `
      <div style="text-align: center;">
        <button
          *ngIf="!isAdmin && !isSuperAdmin && hasAdminPrivilege && !isHimself" type="submit" class="btn btn-sm btn-primary active"
          (click)="onMakingAdmin()">
          <i class="fa fa-dot-circle-o"></i> Make Admin
        </button>
        <button
          *ngIf="isAdmin && !isSuperAdmin && hasAdminPrivilege && !isHimself" type="submit" class="btn btn-sm btn-danger active"
          (click)="onMakingUser()">
          <i class="fa fa-dot-circle-o"></i> Make User
        </button>
      </div>
    `,
})
export class TableUserRoleComponent implements ViewCell, OnInit {

  hasAdminPrivilege: boolean;
  isHimself: boolean;
  isAdmin: boolean;
  isSuperAdmin: boolean;
  userID: number;

  @Input() value: string | number;
  @Input() rowData: any;

  @Output() save: EventEmitter<any> = new EventEmitter();

  constructor(
    private usersService: UsersService,
    private authStorageService: AuthStorageService
  ) {

  }

  ngOnInit() {
    this.hasAdminPrivilege = this.authStorageService.getAdminStatus();
    this.isHimself = this.authStorageService.getUsername() === this.rowData.username;
    this.isAdmin = this.rowData.is_admin;
    this.isSuperAdmin = this.rowData.is_superadmin;
    this.userID = this.rowData.id;
  }

  onMakingAdmin() {
    const username = this.authStorageService.getUsername();
    const authToken = this.authStorageService.getAuthToken();
    this.usersService.giveAdminPermission(this.userID, {
      username: username,
      auth_token: authToken
    })
      .then((res) => {
        if (res.status === 'success') {
          this.save.emit(this.rowData);
        }
      });
  }

  onMakingUser() {
    const username = this.authStorageService.getUsername();
    const authToken = this.authStorageService.getAuthToken();
    this.usersService.takeAdminPermission(this.userID, {
      username: username,
      auth_token: authToken
    })
      .then((res) => {
        if (res.status === 'success') {
          this.save.emit(this.rowData);
        }
      });
  }

}
