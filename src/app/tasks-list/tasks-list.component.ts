import { Component, OnInit } from '@angular/core';

import { TaskService } from '../task.service';
import { Task } from '../Task';

@Component({
  selector: 'app-tasks-list',
  templateUrl: './tasks-list.component.html',
  styleUrls: ['./tasks-list.component.css']
})
export class TasksListComponent implements OnInit {
  tasks: Task[] = [];
  user: string | null = localStorage.getItem('auth');

  constructor(private taskService: TaskService) { }

  ngOnInit(): void {
    this.user = localStorage.getItem('auth');
    this.getTasks();
  }

  update(e:any, task:Task): void{
  task.content = e.target.textContent;

  }

  onChangeCompleted(id: number): void{
    this.taskService.changeCompleted(id).subscribe(() => this.getTasks());
  }

  onRemove(id: number): void{
    this.taskService.removeTask(id).subscribe(() => this.getTasks());
  }

  onEdit(id: number, edit: boolean): void{
    const t = this.tasks.find(t => t.id == id);
    if(!t) return;
    t.edit = !t.edit;
    if(edit)
      this.getTasks();

  }

  onSave(id: number, cont: string): void{
    this.taskService.editTask(id,cont).subscribe(() => this.getTasks());
  }

  getTasks(): void{
    this.taskService.getTasks().subscribe((tasks) => this.tasks = tasks);
  }

  onTaskAdd(): void{
    this.getTasks();
  }

  logout() {
    localStorage.removeItem('auth');
    this.taskService.logout().subscribe();
  }

  auth(): boolean{
    return this.taskService.auth();
  }

}
