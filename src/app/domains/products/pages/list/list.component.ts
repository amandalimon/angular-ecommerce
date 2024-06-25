import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../../shared/components/header/header.component';
import { ProductComponent } from '../../components/product/product.component';
import { Product } from '../../../shared/models/product.model';
import { CartService } from '../../../shared/services/cart.service';
import { ProductService } from '../../../shared/services/product.service';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CommonModule, ProductComponent, HeaderComponent],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListComponent {

  products = signal<Product[]>([]);
  private productService = inject(ProductService)
  private cartService = inject(CartService);

  ngOnInit() {
    this.productService.getProducts()
      .subscribe({
        next: (products) => {
          this.products.set(products);
        },
        error: (err) => {
          console.error('Error fetching products', err);
        }
      })
  }

  addToCart(product: Product) {
    this.cartService.addToCart(product)
  }
}
