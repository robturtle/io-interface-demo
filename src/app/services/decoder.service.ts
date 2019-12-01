import { Decoder, isRight } from 'io-interface';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DecoderService {
  readonly schemas = [];

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
