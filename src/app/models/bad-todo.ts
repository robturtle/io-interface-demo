import { Latitude, Longitude } from 'io-interface';

export interface BadTodo {
  user_id: number;
  id: string;
  title: string;
  description: string;
  completed: boolean;
  created_at: Date;
  lat: Latitude;
  lng: Longitude;
}
