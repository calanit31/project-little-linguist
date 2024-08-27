import { Injectable } from '@angular/core';
import { Category } from '../../shared/model/category';
import { categories } from '../../shared/data/categories';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  private readonly CATEGORIES_KEY = 'categories';
  private readonly NEXT_ID_KEY = 'nextId';

  public getCatgoryById(id: number): Category | null {
    const categoryMap = this.getCategories();
    console.log(categoryMap);

    const category = categoryMap.get(id);
    if (category) {
      return category;
    }
    return null;
  }

  private getCategories(): Map<number, Category> {
    const categoriesString = localStorage.getItem(this.CATEGORIES_KEY);

    if (!categoriesString) {
      const map = new Map<number, Category>();
      for (const cat of categories) {
        map.set(cat.id, cat);
      }
      this.setCategories(map);
      return map;
    } else {
      const parsedCategories = JSON.parse(categoriesString);

      if (Array.isArray(parsedCategories)) {
        return new Map<number, Category>(parsedCategories);
      } else {
        return new Map<number, Category>();
      }
    }
  }

  private getNextId(): number {
    const nextIdString = localStorage.getItem(this.NEXT_ID_KEY);
    return nextIdString ? parseInt(nextIdString) : 0;
  }

  private setCategories(list: Map<number, Category>): void {
    localStorage.setItem(
      this.CATEGORIES_KEY,
      JSON.stringify(Array.from(list.entries()))
    );
  }

  private setNextId(id: number): void {
    localStorage.setItem(this.NEXT_ID_KEY, id.toString());
  }

  list(): Category[] {
    return Array.from(this.getCategories().values());
  }

  get(id: number): Category | undefined {
    return this.getCategories().get(id);
  }

  delete(id: number): void {
    const categoriesMap = this.getCategories();
    categoriesMap.delete(id);
    this.setCategories(categoriesMap);
  }

  update(category: Category): void {
    const categoriesMap = this.getCategories();

    category.lastUpdateDate = new Date();
    categoriesMap.set(category.id, category);

    this.setCategories(categoriesMap);
  }

  add(category: Category): void {
    category.id = this.getNextId();
    category.lastUpdateDate = new Date();

    const categoriesMap = this.getCategories();
    categoriesMap.set(category.id, category);

    this.setCategories(categoriesMap);
    this.setNextId(++category.id);
  }
}
