import { OnInit, Component, EventEmitter, Input, Output } from '@angular/core';
import { ViewCell } from 'ng2-smart-table';
import { Router } from '@angular/router';

@Component({
  selector: 'app-completed-task-actions',
  template: `
      <div style="text-align: center;">
        <button
          type="submit" class="btn btn-sm btn-secondary active"
          (click)="view()">
          <i class="fa fa-dot-circle-o"></i> View
        </button>
      </div>
    `,
})
export class CompletedTaskActionsComponent implements ViewCell, OnInit {

  taskID: number;

  @Input() value: string | number;
  @Input() rowData: any;

  @Output() save: EventEmitter<any> = new EventEmitter();

  constructor(
    private router: Router,
  ) {

  }

  ngOnInit() {
    this.taskID = this.rowData.id;
  }

  view() {
    this.router.navigate(['/task', this.taskID]);
  }

}
