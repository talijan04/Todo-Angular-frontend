import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import {Task} from './task';
import {HttpErrorHandlerService, HandleError} from '../http-error-handler.service';

@Injectable({
  providedIn: 'root'
})

export class TasksService {
  private handleError: HandleError

  constructor(private http: HttpClient, httpErrorHandler: HttpErrorHandlerService) {
    this.handleError = httpErrorHandler.createHandleError('TasksService')
   }

   getTasks(): Observable<Task[]>{
     return this.http
     .get<Task[]>(`/api/tasks`)
     .pipe(catchError(this.handleError('getTasks', [])))
   }

   addTask(task: Task): Observable<Task>{
    return this.http
    .post<Task>('/api/tasks', task)
    .pipe(catchError(this.handleError('addTask', task)))
  }

  deleteTask(id: number): Observable<{}>{
    const url = `/api/tasks/${id}`
    return this.http
        .delete(url)
        .pipe(catchError(this.handleError('deleteTask')))
  }

  updateTask(task: Task): Observable<Task> {
    return this.http
           .put<Task>(`/api/tasks/${task.id}`, task)
           .pipe(catchError(this.handleError('updateTask', task)))
  }
  /*getTasks(){
     return [
       {"id": 1, "title": "Prvo"},
       {"id": 2, "title": "Drugo"},
       {"id": 3, "title": "Trece"}
     ]
   }*/
}
