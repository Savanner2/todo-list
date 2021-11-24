import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TaskService } from '../task.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  login: string = '';
  pass: string = '';
  wrong: boolean = false;

  constructor(private taskService: TaskService, private router: Router) {}


  ngOnInit(): void {
    if(this.auth()) this.router.navigate(['']);
  }

  submit() {
    this.taskService.login(this.login,this.pass).subscribe({
      next: auth => {
        if(auth){
          localStorage.setItem('auth',this.login)
          this.login = '';
          this.pass = '';
          this.wrong = false;
          this.router.navigate(['/']);
        }
        else{
          this.wrong = true;
          this.pass = '';
        }
      }

    });
  }

  auth(): boolean{
    return this.taskService.auth();
  }

}
