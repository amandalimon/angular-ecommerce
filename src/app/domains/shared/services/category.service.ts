import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Category } from '@shared/models/category.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private http = inject(HttpClient);

  constructor() { }

  getAll() {
    return this.http.get<string>('https://dummyjson.com/products/category-list')
  }
}
