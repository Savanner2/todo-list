import { Component, OnInit } from '@angular/core';
import { TaskService } from '../task.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  login: string = '';
  pass: string = '';

  constructor(private taskService: TaskService) {}


  ngOnInit(): void {
  }

  submit() {
    this.taskService.login(this.login,this.pass).subscribe({
      next: auth => localStorage.setItem('auth',JSON.stringify(auth))
      
    });
    this.login = '';
    this.pass = '';
  }

  auth(): any{
    const auth = JSON.parse(localStorage.getItem('auth')!);
    
      return auth;
  }

  logout() {
    localStorage.setItem('auth',JSON.stringify(false));
  }

}
