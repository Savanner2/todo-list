import { Component, OnInit } from '@angular/core';
import { TaskService } from '../task.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  login: string = '';
  pass: string = '';
  err: string = 'Something went wrong';
  showMsg: boolean = false;
  showErr: boolean = false;

  constructor(private taskService: TaskService) { }

  ngOnInit(): void {
  }

  submit() {
    this.taskService.register(this.login,this.pass).subscribe({
      next: reg => {
        if(reg){
          this.login = '';
          this.pass = '';
          this.showMsg = true;
        }
        else{
          this.showErr = true;
          this.err = 'Login is already taken';
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

}
