import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CategoryList } from '../models';
import { CategoryService } from '../services/category.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {
  categories$ = this._category.getAll();

  constructor(private _category: CategoryService) { }

  ngOnInit(): void {
  }

}
