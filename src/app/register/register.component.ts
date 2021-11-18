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
  pass2: string = '';
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
          this.pass2 = '';
          this.showMsg = true;
          setTimeout(() => {
            this.showMsg = false;
          }, 5000);
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

  passwordsMatch(): boolean{
    if(this.pass === '' || this.pass2 === '')
      return false;
    return this.pass === this.pass2;
  }

  tooLong(): boolean{
    return this.login.length > 20;
  }

}
