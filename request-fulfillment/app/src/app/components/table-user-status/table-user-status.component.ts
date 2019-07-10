import { OnInit, Component, EventEmitter, Input, Output } from '@angular/core';
import { ViewCell } from 'ng2-smart-table';
import { AuthStorageService } from '../../services/local-helpers/auth-storage.service';
import { UsersService } from '../../services/api/users.service';

@Component({
  selector: 'app-table-user-status',
  template: `
      <div style="text-align: center;">
        <button
          *ngIf="hasAdminPrivilege" type="submit" class="btn btn-sm btn-primary active"
          (click)="onApprove()">
          <i class="fa fa-dot-circle-o"></i> Approve
        </button>
        <button
          *ngIf="hasAdminPrivilege" type="submit" class="btn btn-sm btn-danger active"
          (click)="onReject()">
          <i class="fa fa-dot-circle-o"></i> Reject
        </button>
      </div>
    `,
})
export class TableUserStatusComponent implements ViewCell, OnInit {

  hasAdminPrivilege: boolean;
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
    this.userID = this.rowData.id;
  }

  onApprove() {
    const username = this.authStorageService.getUsername();
    const authToken = this.authStorageService.getAuthToken();
    this.usersService.approveUser(this.userID, {
      username: username,
      auth_token: authToken
    })
      .then((res) => {
        if (res.status === 'success') {
          this.save.emit(this.rowData);
        }
      });
  }

  onReject() {
    const username = this.authStorageService.getUsername();
    const authToken = this.authStorageService.getAuthToken();
    this.usersService.rejectUser(this.userID, {
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
