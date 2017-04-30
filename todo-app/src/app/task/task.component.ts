import { Component, OnInit } from '@angular/core';
import {TaskService} from "../task.service";

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {
  tasks = [];
  constructor(private taskService: TaskService) { }

  ngOnInit() {
    this.tasks = this.taskService.index();
  }
}
