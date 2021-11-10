import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { TaskService } from './task.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private taskService: TaskService){}

  auth(): any{
    const auth = JSON.parse(localStorage.getItem('auth')!);
    
      return auth;
  }

}
