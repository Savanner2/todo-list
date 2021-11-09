import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Task } from './Task';

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

  constructor(private http: HttpClient) {}

  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.apiUrl);
  }

  addTask(cont: string): Observable<Task> {
    const content = {
      content: cont
    }
    return this.http.post<Task>(this.apiUrl, content);
  }

  changeCompleted(id: number): Observable<Task[]>{
    const url = `${this.apiUrl}/${id}/completed`;    
    return this.http.put<Task[]>(url, httpOptions);
  }
  changeEdit(id: number): Observable<Task[]>{
    const url = `${this.apiUrl}/${id}/edit`;
    return this.http.put<Task[]>(url, httpOptions);
  }
  
  editTask(id: number, cont: string): Observable<Task[]>{
    const content = {
      content: cont
    }
    return this.http.put<Task[]>(`${this.apiUrl}/${id}`,content);
  }

  removeTask(id: number): Observable<Task[]>{
    return this.http.delete<Task[]>(`${this.apiUrl}/${id}`);
  }
  
}
