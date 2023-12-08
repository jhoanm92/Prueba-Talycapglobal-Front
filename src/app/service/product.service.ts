import { Product } from 'src/app/model/product';
import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(
    private http: HttpClient,
  ) { }

  private url: string = environment.HOST;

  getAll(){
    return this.http.get<Product[]>(`${this.url}/products`);
  }

  register(product: Product){
    return this.http.post<Product>(`${this.url}/products`, product);
  }

  update(product: Product){
    return this.http.put<Product>(`${this.url}/products`, product);
  }

  delete(id: number){
    return this.http.delete(`${this.url}/products/${id}`);
  }
}
