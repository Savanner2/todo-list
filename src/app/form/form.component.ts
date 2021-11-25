import { Component, OnInit, Output, EventEmitter } from '@angular/core';


import { TaskService } from '../task.service';

@Component({
    selector: 'app-form',
    templateUrl: './form.component.html',
    styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
    cont: string = '';
    @Output() taskAdd = new EventEmitter();

    constructor(private taskService: TaskService) { }

    ngOnInit(): void {
    }

    onSubmit(): void {
        this.taskService.addTask(this.cont).subscribe(() => this.taskAdd.emit());
    }

}
