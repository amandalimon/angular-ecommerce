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

  constructor() { }

  getProducts(): Observable<Product[]> {
    return this.http.get<{ products: Product[], total: number, skip: number, limit: number }>
      ('https://dummyjson.com/products?limit=36&skip=77').pipe(map(response => response.products));
  }

  getOne(id: string) {
    return this.http.get<Product>(`https://dummyjson.com/products/${id}`)
  }
}
