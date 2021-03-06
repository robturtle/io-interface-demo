# io-interface demo

This is a demo project to illustrate the usage of [io-interface](https://github.com/robturtle/io-interface).

## Setup ts-patch

1. `npm install -D ts-patch`

2. add "postinstall" script to `package.json` to auto-patch the compiler after `npm install`

   ```json
   {
     "scripts": {
       "postinstall": "ts-patch install"
     }
   }
   ```

3. `npm install -D io-interface`

4. add transformer to `tsconfig.json`

   ```json
   {
     "compilerOptions": {
       "plugins": [{ "transform": "io-interface/transform-interface" }]
     }
   }
   ```

To verify the setup, add this testing code to `app.component.ts`

```typescript
import { schema } from 'io-interface';

interface Order {
  price: number;
  date: Date;
  note?: string;
  pricelines: number[];
}
const OrderSchema = schema<Order>();
console.log(OrderSchema);
```

You should see the console message like this:

![image](https://user-images.githubusercontent.com/3524125/69911372-66148400-13cf-11ea-84f7-b9a7c84f79ee.png)

## Create a DecoderService

The example code is as follows. [src/app/services/decoder.service.ts](src/app/services/decoder.service.ts)

```typescript
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
```

## Daily usage

### 1. define an interface

Example: [src/app/models/todo.ts](src/app/models/todo.ts).

```typescript
// src/app/models/todo.ts
export interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}
```

### 2. register the type to DecoderService's schemas

```typescript
// src/app/services/decoder.service.ts
readonly schemas = [schema<Todo>()];
```

### 3. Use DecoderService to convert the data

[src/app/services/todo.service.ts](src/app/services/todo.service.ts)

```typescript
// src/app/services/todo.service.ts
  getTodo(): Observable<Todo> {
    return this.http.get('https://jsonplaceholder.typicode.com/todos/1').pipe(
      map(json => this.dec.decode<Todo>('Todo', json)),
      filter(todo => !!todo),
    );
  }
```

And that's it! Now in [todo.component.ts](src/app/todo/todo.component.ts) we can use the data as `Todo` without worrying about the data is in a wrong layout/value.

```typescript
// src/app/todo/todo.component.ts
todo: Todo;

this.service.getTodo().subscribe(todo => (this.todo = todo));
```

## Can we do better?

As you can see from the signature `decode<Todo>('Todo', json)`, `Todo` repeats twice. But for native TypeScript this is needed because the type parameter is for static environment and method parameter is for runtime environment. I don't find a very good solution here but I created a specific TypeScript transformer to expand a macro such as `decode<Todo>(json)` to `decode<Todo>('Todo', json)`. The solution will not shared here but you get the idea. Since TypeScript will never populate the interface information to runtime so I guess this would be the easiest way to reduce the duplication.

## Error handling

In the example `DecoderService`, class `Decoder` provides a `errors` method to generate a `string[]` from an invalid decoding result. Say if we somehow made the interface definition out of sync with the backend:

```typescript
export interface BadTodo {
  user_id: number;
  id: string;
  title: string;
  description: string;
  completed: boolean;
}
```

And if you try to decode to this interface from the same backend data. You will see this error poped up.

![image](https://user-images.githubusercontent.com/3524125/69911276-eb973480-13cd-11ea-89a2-31692ba81702.png)
