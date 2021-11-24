import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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

  constructor(private taskService: TaskService, private router: Router) { }

  ngOnInit(): void {
    if(this.auth()) this.router.navigate(['']);
  }

  submit() {

    this.taskService.register(this.login,this.pass).subscribe({
      next: reg => {
        if(reg){
          this.showMsg = true;
          setTimeout(() => {
            this.showMsg = false;
            this.router.navigate(['/login']);
          }, 2000);

        }
        else{
          this.showErr = true;
          this.err = 'Login is already taken';
        }
      }

    });
  }

  auth(): boolean{
    return this.taskService.auth();
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
