import { Injectable } from '@angular/core';
import { Category } from '../../shared/model/category';

import {
  addDoc,
  collection,
  doc,
  DocumentSnapshot,
  Firestore,
  getDocs,
  getFirestore,
  query,
  setDoc,
  where,
} from '@angular/fire/firestore';

import CategoriesConverter from './converters/categories-converter';
import { deleteDoc } from '@firebase/firestore';
//import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  private readonly CATEGORIES_KEY = 'categories';
  private readonly collectionName = 'categories';
  private readonly NEXT_ID_KEY = 'nextId';
  private categoryMap = new Map<string, Category>();

  constructor(private firestoreService: Firestore) {}
  public async getCatgoryById(id: string): Promise<Category | null> {
    if (this.categoryMap.size == 0) {
      await this.getCategories();
    }

    const category = this.categoryMap.get(id);
    if (category) {
      return category;
    }
    return null;
  }

  private async getCategories(): Promise<Map<string, Category>> {
    const categories = await this.list();

    this.categoryMap = new Map<string, Category>();
    for (const cat of categories) {
      this.categoryMap.set(cat.id, cat);
    }
    return this.categoryMap;
  }

  private getNextId(): number {
    const nextIdString = localStorage.getItem(this.NEXT_ID_KEY);
    return nextIdString ? parseInt(nextIdString) : 0;
  }

  private setCategories(list: Map<string, Category>): void {
    localStorage.setItem(
      this.CATEGORIES_KEY,
      JSON.stringify(Array.from(list.entries()))
    );
  }

  private setNextId(id: number): void {
    localStorage.setItem(this.NEXT_ID_KEY, id.toString());
  }

  async list(): Promise<Category[]> {
    const gameResultCollection = collection(
      this.firestoreService,
      this.collectionName
    ).withConverter(CategoriesConverter);
    const snapshot = await getDocs(gameResultCollection);
    const results: Category[] = [];
    snapshot.docs.forEach((docSnapshot: DocumentSnapshot<Category>) => {
      const data = docSnapshot.data();
      if (data) {
        results.push(data);
      }
    });

    return results;
  }

  async get(id: string): Promise<Category | null> {
    return await this.getCatgoryById(id);
  }

  async delete(existingCategoryId: string): Promise<void> {
    const db = getFirestore(this.firestoreService.app);
    await deleteDoc(doc(db, this.collectionName, existingCategoryId));
  }

  async update(existingCategory: Category): Promise<void> {
    const db = getFirestore(this.firestoreService.app);
    await setDoc(
      doc(db, this.collectionName, existingCategory.id),
      existingCategory
    );
  }

  async add(newCategory: Category): Promise<void> {
    const categoryCollection = collection(
      this.firestoreService,
      this.collectionName
    ).withConverter(CategoriesConverter);

    const q = query(categoryCollection, where('name', '==', newCategory.name));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      await addDoc(categoryCollection, newCategory);
    }
  }
}
