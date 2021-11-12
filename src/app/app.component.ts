import { Component } from '@angular/core';
import { TaskService } from './task.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private taskService: TaskService){}

  auth(): any{
    const auth = localStorage.getItem('auth');
    
    if(auth)
      return true;
    else
      return false;
  }

}
