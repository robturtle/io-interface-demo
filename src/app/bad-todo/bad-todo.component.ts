import { Component, OnInit } from '@angular/core';
import { TodoService } from '../services/todo.service';
import { BadTodo } from '../models/bad-todo';

@Component({
  selector: 'app-bad-todo',
  templateUrl: './bad-todo.component.html',
  styleUrls: ['./bad-todo.component.scss'],
})
export class BadTodoComponent implements OnInit {
  todo: BadTodo;

  constructor(private service: TodoService) {}

  ngOnInit() {
    this.service.getBadTodo().subscribe(badTodo => (this.todo = badTodo));
  }
}
