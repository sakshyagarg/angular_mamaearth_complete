import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Order } from 'src/app/models/order';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css'],
})
export class OrdersComponent implements OnInit {
  orderedItems1!: Order[];
  total: number = 0;
  arr: Order[][] = [];
  arr1: Order[] = [];
  arr2: number[] = [];

  constructor(private orderService: OrderService, private router: Router) {}

  ngOnInit(): void {
    this.getAllOrders();
  }

  getAllOrders() {
    this.orderService.getAllOrders().subscribe({
      next: (response: any) => {
        this.orderedItems1 = response;
        this.orderedItems1.forEach((order) => {
          if (this.arr1.length === 0) {
            console.log(this.arr1.length);
            this.arr1.push(order);
            this.total += order.price * order.quantity;
          } else if (this.arr1[0].orderId === order.orderId) {
            this.arr1.push(order);
            this.total += order.price * order.quantity;
          } else {
            this.arr.push(this.arr1);
            this.arr2.push(this.total);
            this.arr1 = [];
            this.total = 0;
            this.arr1.push(order);
            this.total += order.price * order.quantity;
          }
        });
        this.arr.push(this.arr1);
        this.arr2.push(this.total);
        console.log(this.arr);
      },
      error: (error: any) => console.log(error),
    });
  }

  noItemsInCart() {
    this.router.navigate(['']);
  }
}
