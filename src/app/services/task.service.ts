import { Injectable } from '@angular/core';
import { Task } from 'src/app/interfaces/task';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private apiUrl = 'http://localhost:5000/tasks'
  private taskList: Task[] = [];
  private taskListListener: Subject<Task[]> = new Subject();

  constructor(private http: HttpClient) { }

  getTasks(): void {
    let tasksObs = this.http.get<Task[]>(this.apiUrl);
    tasksObs.subscribe( (response: Task[]) => {
      this.taskListListener.next([...response]
    )});
  }

  getTaskListListener(): Subject<Task[]> {
    return this.taskListListener;
  }
}
