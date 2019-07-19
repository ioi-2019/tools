import { OnInit, Component, EventEmitter, Input, Output, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { ViewCell } from 'ng2-smart-table';
import { AuthStorageService } from '../../services/local-helpers/auth-storage.service';
import { TasksService } from '../../services/api/tasks.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs';
import { UsersService } from '../../services/api/users.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-task-actions',
  template: `
      <div style="text-align: center;">
        <button
          type="submit" class="btn btn-sm btn-secondary active"
          (click)="view()">
          <i class="fa fa-dot-circle-o"></i> View
        </button>
        <button
          type="submit" class="btn btn-sm btn-primary active"
          (click)="assignMe()">
          <i class="fa fa-dot-circle-o"></i> Assign Me
        </button>
        <button
          type="submit" class="btn btn-sm btn-success active"
          (click)="assignOther()">
          <i class="fa fa-dot-circle-o"></i> Assign Other
        </button>
      </div>
    `,
})
export class NewTaskActionsComponent implements ViewCell, OnInit {

  isAssigned: boolean;
  taskID: number;

  tripAssignmentModalRef: BsModalRef;

  @Input() value: string | number;
  @Input() rowData: any;

  @Output() save: EventEmitter<any> = new EventEmitter();

  constructor(
    private router: Router,
    private tasksService: TasksService,
    private authStorageService: AuthStorageService,
    private modalService: BsModalService
  ) {

  }

  ngOnInit() {
    this.isAssigned = true;
    this.taskID = this.rowData.id;
  }

  assignMe() {
    const username = this.authStorageService.getUsername();
    const authToken = this.authStorageService.getAuthToken();
    this.tasksService.assignUser(this.taskID, {
      username: username,
      auth_token: authToken,
      assignee_username: username
    })
      .then((res) => {
        if (res.status === 'success') {
          this.save.emit(this.rowData);
        }
      });
  }

  assignOther() {
    const username = this.authStorageService.getUsername();
    const authToken = this.authStorageService.getAuthToken();
    const initialState = {
      taskID: this.taskID,
      username: username,
      authToken: authToken
    };
    this.tripAssignmentModalRef = this.modalService.show(
      TaskAssignmentComponent,
      { initialState: initialState, class: 'modal-dialog modal-lg' }
    );
    this.tripAssignmentModalRef.content.isAssigned.subscribe((isAssigned) => {
      if (isAssigned === true) {
        this.save.emit(this.rowData);
      }
    });
  }

  view() {
    this.router.navigate(['/task', this.taskID]);
  }

}

@Component({
  selector: 'app-task-assignment-modal',
  template: `
  <div class="modal-header">
    <h4 class="modal-title">Task Assignment</h4>
    <button type="button" class="close" (click)="close()" aria-label="Close">
      <span aria-hidden="true">&times;</span>
    </button>
  </div>
  <div class="modal-body">
    <form action="" method="post" class="form-horizontal">
      <div class="form-group row">
        <div class="col-md-12">
          <div class="input-group">
            <span class="input-group-prepend">
              <button
                type="button" class="btn btn-primary"
                (click)="search()"><i class="fa fa-search"></i> Search
              </button>
            </span>
            <input type="text" id="input1-group2" name="input1-group2" class="form-control"
              placeholder="Username" [(ngModel)]="searchQuery">
          </div>
        </div>
      </div>
    </form>
    <table id="taskstable" class="taskstable table table-responsive-sm table-hover table-outline mb-0">
      <thead class="thead-light">
        <tr>
          <th class="text-center"><i class="icon-people"></i></th>
          <th>Username</th>
          <th>Full Name</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr *ngFor="let user of users">
          <td class="text-center">
            {{ user.id }}
          </td>
          <td>
            <div>{{ user.username }}</div>
          </td>
          <td>
            <div>{{ user.first_name }} {{ user.last_name }}</div>
          </td>
          <td>
            <button
              type="submit" class="btn btn-sm btn-primary active"
              (click)="assign(user.username)">
              <i class="fa fa-dot-circle-o"></i> Assign
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <div class="modal-footer">
    <button type="button" class="btn btn-secondary" (click)="close()">
      Close
    </button>
  </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskAssignmentComponent implements OnInit {

  taskID: number;
  username: string;
  authToken: string;
  assigneeUsername: string;
  searchQuery: string;
  users: any[];

  @Output() isAssigned: Subject<boolean>;

  constructor(
    public bsModalRef: BsModalRef,
    private changeRef: ChangeDetectorRef,
    private tasksService: TasksService,
    private usersService: UsersService
  ) {
    this.users = [];
  }

  ngOnInit() {
    this.isAssigned = new Subject();
  }

  assign(username) {
    // TODO: fix assignee_username choice
    this.tasksService.assignUser(this.taskID, {
      username: this.username,
      auth_token: this.authToken,
      assignee_username: username
    })
      .then((res) => {
        if (res.status === 'success') {
          this.isAssigned.next(true);
          this.bsModalRef.hide();
        }
      });
  }

  search() {
    this.usersService.searchUsers({
      username: this.username,
      auth_token: this.authToken,
      query: this.searchQuery
    })
      .then((res) => {
        if (res.status === 'success') {
          this.users = res.data.users;
          this.detectChanges();
        }
      });
  }

  close() {
    this.isAssigned.next(false);
    this.bsModalRef.hide();
  }

  detectChanges() {
    // run this to avoid "view already destroyed" error
    if (!this.changeRef['destroyed']) {
      this.changeRef.detectChanges();
    }
  }

}
