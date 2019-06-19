import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';


import { Task } from './task';
import { TasksService } from './tasks.service';
 
@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss'],
  providers: [TasksService]
})

export class TasksComponent implements OnInit {
  tasks: Task[];
  editTask: Task;

  constructor(private taskService: TasksService, private toastr: ToastrService) { }

  ngOnInit() {
      this.getTasks()
  }
/*
  getTasks(){
    this.tasks = this.taskService.getTasks();
  }*/

  getTasks(): void{
    this.taskService.getTasks().subscribe(tasks => this.tasks = tasks)
  }

  add(title: string): void{
       this.editTask = undefined
       
       title = title.trim()
       if (!title) {
         return
       }

       const newTask: Task = { title } as Task
       this.taskService.addTask(newTask).subscribe(task => this.tasks.push(task));
       this.toastr.success('Dodat novi zapis');
       console.log('Dodat novi zapis.');
   }

   delete(task: Task): void{
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
