import { Component } from '@angular/core';
import { schema } from 'io-interface';

interface Order {
  price: number;
  date: Date;
  note?: string;
  pricelines: number[];
}
const orderschema = schema<Order>();
console.log(orderschema);

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'io-interface-demo';
}
