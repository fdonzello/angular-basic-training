import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { News, NewsList } from '../models';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  constructor(private client: HttpClient) { }

  getAll() {
    return this.client.get<NewsList>(`${environment.apiUrl}/news`);
  }

  getById(id: number) {
    return this.client.get<News>(`${environment.apiUrl}/news/${id}`);
  }

  create(news: News) {
    return this.client.post<News>(`${environment.apiUrl}/news`, news);
  }

  update(id: number, news: News) {
    return this.client.put<News>(`${environment.apiUrl}/news/${id}`, news);
  }

  delete(news: News) {
    return this.client.delete(`${environment.apiUrl}/news/${news.id}`);
  }
}
