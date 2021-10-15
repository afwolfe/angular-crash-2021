import { Subscription } from 'rxjs';
import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Task } from 'src/app/interfaces/task';
import { UiService } from 'src/app/services/ui.service';
@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent implements OnInit {
  @Output() onAddTask: EventEmitter<Task> = new EventEmitter();
  text!: string;
  day : string = new Date().toISOString();
  reminder: boolean = true;

  subscription!: Subscription;
  showAddTask!: boolean;

  constructor(private uiService:UiService) {
    this.subscription = uiService.onToggle().subscribe(value =>
      this.showAddTask = value);
  }

  ngOnInit(): void {
  }

  onSubmit() {
    if (!this.text) {
      alert('Please add a task!');
    }
    else if (!this.day) {
      alert('Please add a date!');
    }
    else {
      const newTask: Task = {
        text: this.text,
        day: this.day,
        reminder: this.reminder
      };

      this.onAddTask.emit(newTask);
    }

  }
}
