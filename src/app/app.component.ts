import { animate, query, style, transition, trigger } from '@angular/animations';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { TaskService } from './task.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    trigger('routeAnimations', [
      transition('* <=> *', [
        query(':enter, :leave', [
          style({
            position: 'absolute',
            width: '100%',
            opacity: 0,
            transform: 'scale(0) translateY(-100%)',
          }),
        ], { optional: true }),
        query(':enter', [
          animate('600ms ease'),
        ], { optional: true })
      ]),
  ])
  ]
})
export class AppComponent {
  user: string | null = localStorage.getItem('auth');

  constructor(private taskService: TaskService, private cookieService: CookieService){}

  auth(): any{
    this.user = localStorage.getItem('auth');
    return this.taskService.auth();
  }

  logout() {
    localStorage.removeItem('auth');
    this.cookieService.delete('uid');
    this.taskService.logout().subscribe();
  }

  prepareRoute(outlet: RouterOutlet) {
      return outlet && outlet.activatedRouteData;
  }

}
