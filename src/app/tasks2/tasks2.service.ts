import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import {ITask2} from './task2';
import {HttpErrorHandlerService, HandleError} from '../http-error-handler.service';

@Injectable({
  providedIn: 'root'
})

export class TasksService {
  private handleError: HandleError

  constructor(private http: HttpClient, httpErrorHandler: HttpErrorHandlerService) {
    this.handleError = httpErrorHandler.createHandleError('Tasks2Service')
   }

   getTasks(): Observable<ITask2[]>{
     return this.http
     .get<ITask2[]>(`/api/tasks2`)
     .pipe(catchError(this.handleError('getTasks', [])))
   }

   getTasksByUser(userid: number): Observable<ITask2[]>{
    return this.http
    .get<ITask2[]>(`/api/test2/${userid}`)
    .pipe(catchError(this.handleError('getTasks', [])))
  }
 
  addTask(task: ITask2): Observable<ITask2>{
    return this.http
    .post<ITask2>('/api/tasks2', task)
    .pipe(catchError(this.handleError('addTask', task)))
  }

  deleteTask(id: number): Observable<{}>{
    const url = `/api/tasks2/${id}`
    return this.http
        .delete(url)
        .pipe(catchError(this.handleError('deleteTask')))
  }

  updateTask(task: ITask2): Observable<ITask2> {
    return this.http
           .put<ITask2>(`/api/tasks2/${task.id}`, task)
           .pipe(catchError(this.handleError('updateTask', task)))
  }

}
