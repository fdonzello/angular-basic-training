import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CategoryList } from '../models';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private client: HttpClient) { }

  getAll() {
    return this.client.get<CategoryList>(`${environment.apiUrl}/categories`);
  }
}
