import { Component, OnInit } from '@angular/core';
import { TodoService } from '../services/todo.service';
import { Todo } from '../models/todo';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss'],
})
export class TodoComponent implements OnInit {
  todo: Todo;

  constructor(private service: TodoService) {}

  ngOnInit() {
    this.service.getTodo().subscribe(todo => (this.todo = todo));
  }
}
