import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { TasksService } from '../../services/api/tasks.service';
import { AuthStorageService } from '../../services/local-helpers/auth-storage.service';
import { ToastrService } from 'ngx-toastr';
import * as moment from 'moment';

@Component({
    selector: 'app-task',
    templateUrl: './task.component.html',
    styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit, OnDestroy {

    taskID: number;
    paramsListener: Subscription;
    questionSubject: string;
    questionText: string;
    replySubject: string;
    replyText: string;
    status: string;
    questionDate: string;
    contestantUsername: string;
    contestantFullName: string;
    assigneeUsername: string;
    assigneeFullName: string;
    isTaskLoaded: boolean;
    isOwnTask: boolean;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private authStorageService: AuthStorageService,
        private tasksService: TasksService,
        private toastrService: ToastrService
    ) {
        this.isTaskLoaded = false;
        this.isOwnTask = false;
    }

    ngOnInit() {
        this.paramsListener = this.route.params
            .subscribe((params) => {
                this.taskID = +params['id'];
                const username = this.authStorageService.getUsername();
                const authToken = this.authStorageService.getAuthToken();
                this.tasksService.getTask(this.taskID, {
                    username: username,
                    auth_token: authToken
                })
                    .then((res) => {
                        if (res.status === 'success') {
                            const task = res.data.task;
                            this.questionSubject = task.subject;
                            this.questionText = task.text;
                            this.replySubject = task.reply_subject;
                            this.replyText = task.reply_text;
                            this.status = task.status;
                            this.questionDate = moment(task.question_timestamp).format('HH:mm DD/MM/YYYY').toString();
                            this.contestantUsername = task.contestant_username;
                            this.contestantFullName = `${task.contestant_first_name} ${task.contestant_last_name}`;
                            this.assigneeUsername = task.assignee_username;
                            this.assigneeFullName = `${task.assignee_first_name} ${task.assignee_last_name}`;
                            this.isTaskLoaded = true;
                            this.isOwnTask = username === this.assigneeUsername;
                        }
                    });
            });
    }

    ngOnDestroy() {
        if (this.paramsListener) {
            this.paramsListener.unsubscribe();
        }
    }

    reply() {
        const username = this.authStorageService.getUsername();
        const authToken = this.authStorageService.getAuthToken();
        this.tasksService.replyTask(this.taskID, {
            username: username,
            auth_token: authToken,
            reply_subject: this.replySubject,
            reply_text: this.replyText
        })
            .then((res) => {
                if (res.status === 'success') {
                    this.toastrService.success('Reply is sent');
                }
            });
    }

    complete() {
        const username = this.authStorageService.getUsername();
        const authToken = this.authStorageService.getAuthToken();
        this.tasksService.completeTask(this.taskID, {
            username: username,
            auth_token: authToken
        })
            .then((res) => {
                if (res.status === 'success') {
                    this.toastrService.success('Task is completed');
                    this.status = 'completed';
                    this.router.navigate(['/personal-tasks']);
                }
            });
    }

    cancel() {
        this.router.navigate(['/personal-tasks']);
    }

}
