import { Component, OnInit } from '@angular/core';
import { TodoService } from '../services/todo.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss'],
})
export class TodoComponent implements OnInit {
  constructor(private service: TodoService) {}

  ngOnInit() {}
}
