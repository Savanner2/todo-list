import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Task } from './Task';
import { CookieService } from 'ngx-cookie-service';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private apiUrl = 'http://localhost:3000/task'

  constructor(private http: HttpClient, private cookieService: CookieService) {}

  getUid(){
    return this.cookieService.get('uid');
  }

  getTasks(): Observable<Task[]> {
    const uid = this.getUid();

    return this.http.get<Task[]>(`${this.apiUrl}/${uid}`);
  }

  addTask(cont: string): Observable<Task> {
    const content = {
      content: cont,
      uid: this.getUid()
    }

    return this.http.post<Task>(this.apiUrl, content);
  }

  changeCompleted(id: number): Observable<Task[]>{
    const url = `${this.apiUrl}/${id}/completed`;
    const obj = {
      uid: this.getUid()
    }

    return this.http.put<Task[]>(url, obj, httpOptions);
  }

  editTask(id: number, cont: string): Observable<Task[]>{
    const content = {
      content: cont,
      uid: this.getUid()
    }
    return this.http.put<Task[]>(`${this.apiUrl}/edit/${id}`,content);
  }

  removeTask(id: number): Observable<Task[]>{
    const uid = this.getUid();

    return this.http.delete<Task[]>(`${this.apiUrl}/${uid}/${id}`);
  }


  login(login: string, pass: string): Observable<any>{
    const user = {
      login: login,
      password: pass
    }

    return this.http.post<any>(`http://localhost:3000/login`,user);
  }

  register(login: string, pass: string): Observable<boolean>{
    const user = {
      login: login,
      password: pass
    }

    return this.http.put<boolean>(`http://localhost:3000/register`,user);
  }

  logout() {
    return this.http.get<boolean>('http://localhost:3000/logout');
  }

  auth(): boolean{
    const auth = localStorage.getItem('auth');

    if(auth)
      return true;
    return false;
  }

}
