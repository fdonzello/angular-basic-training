export interface News {
  id?: number;
  title: string;
  description: string;
  category?: Category;
}

export type NewsList = News[];

export interface Category {
  id?: number;
  name: string;
}

export type CategoryList = Category[];
