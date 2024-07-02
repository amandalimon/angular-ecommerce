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

  // getProducts(category_name?: string): Observable<Product[]> {
  //   const url = new URL('https://dummyjson.com/products?limit=36&skip=77');
  //   if(category_name){
  //     url.searchParams.set('category_name', category_name);
  //   }
  //   return this.http.get<{ products: Product[], total: number, skip: number, limit: number }>
  //     (url.toString()).pipe(map(response => response.products));
  // }

  private baseUrl = 'https://dummyjson.com/products';


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
