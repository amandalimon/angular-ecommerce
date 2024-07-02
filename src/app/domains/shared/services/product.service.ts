import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Product } from '../models/product.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private http = inject(HttpClient);
  private baseUrl = 'https://dummyjson.com/products';

  constructor() { }

  getProducts(category_name?: string, skip: number = 0, limit: number = 10): Observable<Product[]> {
    let url = `${this.baseUrl}?limit=${limit}&skip=${skip}`;
    if (category_name) {
      url = `https://dummyjson.com/products/category/${category_name}`;
    }
    return this.http.get<{ products: Product[], total: number, skip: number, limit: number }>(url).pipe(
      map(response => response.products)
    );
  }

  getOne(id: string) {
    return this.http.get<Product>(`https://dummyjson.com/products/${id}`)
  }
}
