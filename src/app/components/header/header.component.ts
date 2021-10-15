import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { UiService } from 'src/app/services/ui.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  title: string = "task-tracker"
  showAddTask!: boolean;
  subscription!: Subscription;

  constructor(private uiService:UiService, private router:Router) {
    this.subscription = uiService.onToggle().subscribe(value =>
      this.showAddTask = value);
  }

  ngOnInit(): void {

    this.uiService.onToggle
  }

  toggleAddTask(): void {
    this.uiService.toggleAddTask();
  }

  hasRoute(route: string) {
    return this.router.url === route;
  }
}
