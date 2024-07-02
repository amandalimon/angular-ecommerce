import { Component, Input, SimpleChanges, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLinkWithHref } from '@angular/router';
import { ProductComponent } from '@products/components/product/product.component';
import { HeaderComponent } from '@shared/components/header/header.component';
import { Product } from '@shared/models/product.model';
import { CartService } from '@shared/services/cart.service';
import { ProductService } from '@shared/services/product.service';
import { CategoryService } from '@shared/services/category.service';
import { CategoryFormatPipe } from "@shared/pipes/category-format.pipe";

@Component({
    selector: 'app-list',
    standalone: true,
    templateUrl: './list.component.html',
    styleUrl: './list.component.css',
    imports: [CommonModule, RouterLinkWithHref, ProductComponent, HeaderComponent, CategoryFormatPipe]
})
export class ListComponent {

  @Input() category_name?: string;

  products = signal<Product[]>([]);
  categories = signal<string>('');

  private productService = inject(ProductService)
  private cartService = inject(CartService);
  private categoryService = inject(CategoryService)

  skip = 0;
  limit = 36;
  totalProducts=194

  ngOnInit() {
    this.getProducts();
    this.getCategories();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['category_name']) {
      this.skip = 0;
      this.getProducts();
    }
  }

  private getProducts() {
    this.productService.getProducts(this.category_name, this.skip, this.limit)
    .subscribe({
      next: (products) => {
        this.products.set(products);
      },
      error: (err) => {
        console.error('Error fetching products', err);
      }
    });
  }

  private getCategories() {
    this.categoryService.getAll().subscribe({
      next: (data) => {
        this.categories.set(data);
      },
      error: (err) => {
        console.error('Error fetching categories', err);
      }
    });
  }

  nextPage() {
    if (this.skip + this.limit < this.totalProducts) {
      this.skip += this.limit;
      this.getProducts();
      console.log(this.skip, this.limit)
    }
  }

  previousPage() {
    if (this.skip > 0) {
      this.skip -= this.limit;
    }
    this.getProducts();
  }

  addToCart(product: Product) {
    this.cartService.addToCart(product)
  }

  getCurrentPage(): number {
    return Math.floor(this.skip / this.limit) + 1;
  }


}
