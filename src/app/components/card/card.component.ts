import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/models/product';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
})
export class CardComponent implements OnInit {
  @Input() product!: Product;
  count!: number;
  isAdmin: boolean = false;
  isLoggedIn: boolean = false;

  constructor(
    private cartService: CartService,
    private router: Router,
    private productService: ProductService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.isAdmin = this.authService.isAdmin();
    this.isLoggedIn = this.authService.isLoggedIn();
  }

  addToCart() {
    if (this.isLoggedIn === false) {
      this.router.navigate(['/login']);
    } else {
      this.cartService.addToCart(this.product);
      this.count = this.cartService.getCount();
      this.cartService.cartSubject.next(this.count);
    }
  }

  edit(product: Product) {
    this.router.navigate(['/add', product.id]);
  }

  delete(id: number) {
    this.productService.delete(id).subscribe({
      next: (response: any) => {
        console.log(response);
        window.location.reload();
      },
      error: (error: any) => console.log(error),
    });
  }
}
