import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private http: HttpClient) {}

  getAllProducts() {
    return this.http.get(`http://localhost:9085/api/mamaearth/get/all`);
  }

  addProduct(product: Product) {
    return this.http.post(`http://localhost:9085/api/mamaearth/add`, product);
  }

  updateProduct(product: Product) {
    return this.http.put(`http://localhost:9085/api/mamaearth/update`, product);
  }

  delete(id: number) {
    return this.http.delete(`http://localhost:9085/api/mamaearth/delete/${id}`);
  }
}
