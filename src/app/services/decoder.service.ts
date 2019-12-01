import { Decoder, isRight, schema } from 'io-interface';
import { Injectable } from '@angular/core';
import { Todo } from '../models/todo';
import { BadTodo } from '../models/bad-todo';

@Injectable({
  providedIn: 'root',
})
export class DecoderService {
  readonly schemas = [schema<Todo>(), schema<BadTodo>()];

  readonly decoder = new Decoder(this.schemas);

  decode<T>(typeName: string, data: unknown): T | undefined {
    const result = this.decoder.decode<T>(typeName, data);
    if (isRight(result)) {
      return result.right;
    } else {
      console.error(Decoder.errors(result));
    }
  }

  decodeArray<T>(typeName: string, data: unknown): T[] | undefined {
    const result = this.decoder.decodeArray<T>(typeName, data);
    if (isRight(result)) {
      return result.right;
    } else {
      console.error(Decoder.errors(result));
    }
  }
}
