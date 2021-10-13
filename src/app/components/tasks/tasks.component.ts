import { TaskService } from 'src/app/services/task.service';
import { Component, OnInit } from '@angular/core';
import { Task } from 'src/app/interfaces/task';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {
  tasks: Task[] = [];

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    // this.tasks = this.taskService.getTasks();
    this.taskService.getTaskListListener().subscribe(
      (response: Task[]) => this.tasks = response,
      (error: any) => console.log(error)
    );
    this.taskService.getTasks();
  }

}
