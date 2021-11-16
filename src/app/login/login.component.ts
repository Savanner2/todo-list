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
  user: string | null = localStorage.getItem('auth');
  wrong: boolean = false;

  constructor(private taskService: TaskService) {}


  ngOnInit(): void {
  }

  submit() {
    this.taskService.login(this.login,this.pass).subscribe({
      next: auth => {
        if(auth){
          localStorage.setItem('auth',this.login)
          this.user = localStorage.getItem('auth');
          this.login = '';
          this.pass = '';
          this.wrong = false;
        }
        else{
          this.wrong = true;
          this.pass = '';
        }
      }

    });
  }

  auth(): any{
    const auth = localStorage.getItem('auth');

    if(auth)
      return true;
    else
      return false;
  }

  logout() {
    localStorage.removeItem('auth');
  }

}
