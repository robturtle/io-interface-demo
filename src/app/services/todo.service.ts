import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DecoderService } from './decoder.service';
import { Todo } from '../models/todo';
import { map, filter } from 'rxjs/operators';
import { Observable } from 'rxjs';

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
}
