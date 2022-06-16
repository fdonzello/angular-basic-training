import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, switchMap } from 'rxjs';
import { News } from '../models';
import { NewsService } from '../services/news.service';

@Component({
  selector: 'app-news-detail',
  templateUrl: './news-detail.component.html',
  styleUrls: ['./news-detail.component.scss']
})
export class NewsDetailComponent implements OnInit {
  news$: Observable<News> | undefined;

  constructor(
    private _news: NewsService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(p => {
      const id = +p.get('id')!;

      this.news$ = this._news.getById(id);
    })
  }

  delete() {
    this.news$?.pipe(
      switchMap((n) => this._news.delete(n))
    ).subscribe(() => this.router.navigate(['/news']));
  }

}
