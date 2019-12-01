import { Injectable } from '@angular/core';
import { Decoder, schema } from 'io-interface';
import { BadTodo } from '../models/bad-todo';
import { Todo } from '../models/todo';

@Injectable({
  providedIn: 'root',
})
export class DecoderService {
  readonly schemas = [schema<Todo>(), schema<BadTodo>()];

  readonly dec = new Decoder(this.schemas);

  decode<T>(typeName: string, data: unknown): T | undefined {
    return this.dec.decode<T>(typeName, data, console.error);
  }

  decodeArray<T>(typeName: string, data: unknown): T[] | undefined {
    return this.dec.decodeArray<T>(typeName, data, console.error);
  }
}
