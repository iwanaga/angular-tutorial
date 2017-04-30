import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-directive',
  templateUrl: './directive.component.html',
  styleUrls: ['./directive.component.css']
})
export class DirectiveComponent implements OnInit {
  taskList = [
    { id: 1, name: '掃除',    dueDate: new Date() },
    { id: 2, name: '洗濯',    dueDate: new Date() },
    { id: 3, name: 'ゴミ捨て', dueDate: new Date() },
    { id: 4, name: '資料作り', dueDate: new Date() },
    { id: 5, name: '執筆',    dueDate: new Date() }
  ];

  isActivated = true;

  constructor() { }

  ngOnInit() {
  }

  switchActivationState() {
    this.isActivated = !this.isActivated;
  }
}
