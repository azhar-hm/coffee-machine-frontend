import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CoffeeDetails } from '../models/coffee-model';

@Injectable({
  providedIn: 'root'
})
export class CoffeeDetailsService {
  private url = 'assets/coffee-details.json';

  constructor(private http: HttpClient) { }

  getCoffeeDetails(): Observable<CoffeeDetails> {
    return this.http.get<CoffeeDetails>(this.url);
  }
}
