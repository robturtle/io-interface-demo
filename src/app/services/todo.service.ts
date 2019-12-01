import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Todo } from '../models/todo';
import { DecoderService } from './decoder.service';
import { BadTodo } from '../models/bad-todo';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  constructor(private http: HttpClient, private dec: DecoderService) {}

  getTodo(): Observable<Todo> {
    return this.http.get('https://jsonplaceholder.typicode.com/todos/1').pipe(
      map(json => this.dec.decode<Todo>('Todo', json)),
      filter(todo => !!todo),
    );
  }

  getBadTodo(): Observable<BadTodo> {
    return this.http.get('https://jsonplaceholder.typicode.com/todos/1').pipe(
      map(json => this.dec.decode<BadTodo>('BadTodo', json)),
      filter(todo => !!todo),
    );
  }
}
