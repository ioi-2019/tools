import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss'],
//   template: '<ng2-smart-table [settings]="settings" [source]="data"></ng2-smart-table>',
})
export class TasksComponent implements OnInit {
    settings = {
        mode: 'external',
        hideSubHeader: 'true',
        pager: {
            display: 'true',
            perPage: 20,
        },
        attr: {
          class: 'taskstable table table-responsive-sm table-hover table-outline mb-0',
        },
        edit: {
            editButtonContent: '<i class="fa fa-pencil-square fa-2x"></i>',
            addButtonContent: '<i class="fa fa-trash-o fa-2x"></i>',
            deleteButtonContent: '<i class="fa fa-ban fa-2x"></i>',
        },
        delete: {
            deleteButtonContent: '<i class="fa fa-trash-o fa-2x"></i>',
            confirmDelete: 'true',
        },
        columns: {
            id: {
                title: 'ID',
                width: '7%',
            },
            user: {
                title: 'User',
            },
            country: {
                title: 'Country',
                type: 'html',
            },
            question: {
                title: 'Question',
            },
            status: {
                title: 'Status',
                type: 'html',
                editor: 'completer',
            },
            activity: {
                title: 'activity',
            },
        }
    };

    data = [
        {
            id: 1,
            user: 'Leanne Graham',
            country: '<i class="flag-icon flag-icon-us h4 mb-0" title="us" id="us"></i>',
            question: 'Salam. Çölə çıxmaq olar zəhmət olmasa?',
            status: '<span class="badge badge-success">Answered</span>',
            activity: '10 sec ago',
        },
        {
            id: 2,
            user: 'Leanne Graham',
            country: '<i class="flag-icon flag-icon-us h4 mb-0" title="us" id="us"></i>',
            question: 'Salam. Çölə çıxmaq olar zəhmət olmasa?',
            status: '<span class="badge badge-success">Answered</span>',
            activity: '10 sec ago',
        },
        {
            id: 3,
            user: 'Leanne Graham',
            country: '<i class="flag-icon flag-icon-us h4 mb-0" title="us" id="us"></i>',
            question: 'Salam. Çölə çıxmaq olar zəhmət olmasa?',
            status: '<span class="badge badge-success">Answered</span>',
            activity: '10 sec ago',
        },
        {
            id: 4,
            user: 'Leanne Graham',
            country: '<i class="flag-icon flag-icon-us h4 mb-0" title="us" id="us"></i>',
            question: 'Salam. Çölə çıxmaq olar zəhmət olmasa?',
            status: '<span class="badge badge-success">Answered</span>',
            activity: '10 sec ago',
        },
        {
            id: 5,
            user: 'Leanne Graham',
            country: '<i class="flag-icon flag-icon-us h4 mb-0" title="us" id="us"></i>',
            question: 'Salam. Çölə çıxmaq olar zəhmət olmasa?',
            status: '<span class="badge badge-success">Answered</span>',
            activity: '10 sec ago',
        },
        {
            id: 6,
            user: 'Leanne Graham',
            country: '<i class="flag-icon flag-icon-us h4 mb-0" title="us" id="us"></i>',
            question: 'Salam. Çölə çıxmaq olar zəhmət olmasa?',
            status: '<span class="badge badge-success">Answered</span>',
            activity: '10 sec ago',
        },
        {
            id: 7,
            user: 'Leanne Graham',
            country: '<i class="flag-icon flag-icon-us h4 mb-0" title="us" id="us"></i>',
            question: 'Salam. Çölə çıxmaq olar zəhmət olmasa?',
            status: '<span class="badge badge-success">Answered</span>',
            activity: '10 sec ago',
        },
        {
            id: 8,
            user: 'Leanne Graham',
            country: '<i class="flag-icon flag-icon-us h4 mb-0" title="us" id="us"></i>',
            question: 'Salam. Çölə çıxmaq olar zəhmət olmasa?',
            status: '<span class="badge badge-success">Answered</span>',
            activity: '10 sec ago',
        },
        {
            id: 9,
            user: 'Leanne Graham',
            country: '<i class="flag-icon flag-icon-us h4 mb-0" title="us" id="us"></i>',
            question: 'Salam. Çölə çıxmaq olar zəhmət olmasa?',
            status: '<span class="badge badge-success">Answered</span>',
            activity: '10 sec ago',
        },
        {
            id: 10,
            user: 'Leanne Graham',
            country: '<i class="flag-icon flag-icon-us h4 mb-0" title="us" id="us"></i>',
            question: 'Salam. Çölə çıxmaq olar zəhmət olmasa?',
            status: '<span class="badge badge-success">Answered</span>',
            activity: '10 sec ago',
        },
        {
            id: 11,
            user: 'Leanne Graham',
            country: '<i class="flag-icon flag-icon-us h4 mb-0" title="us" id="us"></i>',
            question: 'Salam. Çölə çıxmaq olar zəhmət olmasa?',
            status: '<span class="badge badge-success">Answered</span>',
            activity: '10 sec ago',
        },
    ];

  constructor() { }

  ngOnInit() {
  }

}
