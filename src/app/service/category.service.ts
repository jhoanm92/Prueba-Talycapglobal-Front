import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Category } from '../model/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(
    private http: HttpClient,
  ) { }

  private url: string = environment.HOST;

  getAll(){
    return this.http.get<Category[]>(`${this.url}/categories`)
  }
}
