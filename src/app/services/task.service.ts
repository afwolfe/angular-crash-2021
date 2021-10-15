import { Injectable } from '@angular/core';
import { Task } from 'src/app/interfaces/task';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private apiUrl = 'http://localhost:5000/tasks'
  private taskList: Task[] = [];
  private taskListListener: Subject<Task[]> = new Subject();

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    }
  )};

  constructor(private http: HttpClient) { }

  getTasks(): void {
    let tasksObs = this.http.get<Task[]>(this.apiUrl);
    tasksObs.subscribe( (response: Task[]) => {
      this.taskList = response;
      this.taskListListener.next([...this.taskList]);
    });
  }

  deleteTask(task: Task): void {
    let tasksObs = this.http.delete(`${this.apiUrl}/${task.id}`);
    tasksObs.subscribe( (response: any) => {
      this.taskList = this.taskList.filter((t) => t.id!==task.id)
      this.taskListListener.next([...this.taskList])
    });
  }

  createTask(task: Task): void {
    let taskObs = this.http.post<Task>(`${this.apiUrl}`, task, this.httpOptions);
    taskObs.subscribe( (response: Task) => {
      this.taskList.push(response);
      this.taskListListener.next([...this.taskList]);
    });
  }

  updateTask(task: Task): void {
    let taskObs = this.http.put<Task>(`${this.apiUrl}/${task.id}`, task, this.httpOptions);
    taskObs.subscribe( (response: Task) => {
      const index = this.taskList.findIndex((t => t.id == task.id));
      this.taskList[index] = response;
      this.taskListListener.next([...this.taskList]);
    });
  }

  getTaskListListener(): Subject<Task[]> {
    return this.taskListListener;
  }
}
