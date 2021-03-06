import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { News } from '../models';
import { NewsService } from '../services/news.service';

@Component({
  selector: 'app-news-form',
  templateUrl: './news-form.component.html',
  styleUrls: ['./news-form.component.scss']
})
export class NewsFormComponent implements OnInit, OnDestroy {
  isEditMode = false;
  id: number | undefined;
  s: Subscription | undefined;

  form = new FormGroup({
    title: new FormControl('', [Validators.required, Validators.minLength(1)]),
    description: new FormControl('', [Validators.required, Validators.minLength(1)]),
    category: new FormGroup({
      id: new FormControl(0, [Validators.required, Validators.minLength(1)]),
      name: new FormControl('', [Validators.required, Validators.minLength(1)])
    })
  });

  constructor(
    private _news: NewsService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnDestroy(): void {
    this.s?.unsubscribe();
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(p => {
      this.isEditMode = p.has('id');

      if (this.isEditMode) {
        this.id = +p.get('id')!;
        this.loadDetail();
      }
    })
  }

  private loadDetail() {
    this.s = this._news.getById(this.id!).subscribe((news) => {
      this.form.patchValue({
        title: news.title,
        description: news.description,
        category: {
          id: news.category?.id,
          name: news.category?.name,
        }
      });
    })
  }

  get categoryGroup() {
    return this.form.get('category') as FormGroup;
  }

  submit() {
    const onDone = () => {
      this.router.navigate(['/news']);
    }

    const news: News = {
      title: this.form.value.title!,
      description: this.form.value.description!,
      category: {
        id: this.form.value.category!.id!,
        name: this.form.value.category!.name!
      }
    }

    if (this.isEditMode) {
      this._news.update(this.id!, news).subscribe(onDone);
    } else {
      this._news.create(news).subscribe(onDone);
    }
  }
}
