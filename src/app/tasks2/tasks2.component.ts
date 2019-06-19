
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';


import { ITask2 } from './task2';
import { TasksService } from './tasks2.service';

import { AuthenticationService, IUserDetails } from '../authentication.service'
import { calcPossibleSecurityContexts } from '@angular/compiler/src/template_parser/binding_parser';


 
@Component({
  selector: 'app-tasks2',
  templateUrl: './tasks2.component.html',
  styleUrls: ['./tasks2.component.scss'],
  providers: [TasksService]
})

export class Tasks2Component implements OnInit {
  tasks: ITask2[]
  editTask: ITask2
  details: IUserDetails
  userid: number
  

  constructor(private taskService: TasksService, private toastr: ToastrService, private auth: AuthenticationService) { }

  ngOnInit() {
       this.getTasksByUser(1)
  }


  getTasks(): void{
    this.taskService.getTasks().subscribe(tasks => this.tasks = tasks)
  }

  getTasksByUser(userid: number): void{
    this.taskService.getTasksByUser(userid).subscribe(tasks => this.tasks = tasks)
  }

  add(title: string): void{
       this.editTask = undefined
       
       title = title.trim()
       if (!title) {
         return
       }

       const newTask: ITask2 = { title } as ITask2
       this.taskService.addTask(newTask).subscribe(task => this.tasks.push(task));
       this.toastr.success('Dodat novi zapis');
       console.log('Dodat novi zapis.');
   }

   delete(task: ITask2): void{
     if(confirm('Da li ste sigurni da je ovaj zadatak obavljen?')){
        this.tasks = this.tasks.filter(h => h !== task)
        this.taskService.deleteTask(task.id).subscribe()}
        this.toastr.warning('Zadatak obrisan.');
   }

   edit(task) {
     this.editTask = task
   }

   update(){
     if (this.editTask) {
       this.taskService.updateTask(this.editTask).subscribe(task => {
            const ix = task ? this.tasks.findIndex(h => h.id === task.id) : -1
            if (ix > -1){
              this.tasks[ix] = task
            }
      
       })
       this.editTask = undefined
     }
   }


}
