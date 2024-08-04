import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { GameProfile } from '../../shared/model/game-profile';
import {  MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { categories } from '../../shared/data/categories';
import { Category } from '../../shared/model/category';

@Component({
  selector: 'app-dialog-game',
  standalone: true,
  imports: [CommonModule,MatDialogModule,MatFormFieldModule,MatInputModule,MatSelectModule,MatButtonModule,MatSelectModule],
  templateUrl: './dialog-game.component.html', 
  styleUrls: ['./dialog-game.component.css']  
})
export class DialogGameComponent {
  categories = categories; 
  selectedCategory: Category | null = null;
  
  constructor(
    public dialogRef: MatDialogRef<DialogGameComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { game: GameProfile }
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
  onCategoryChange(category: Category): void {
    this.selectedCategory = category;
  }

  getCategoryWordsCount(category: Category): number {
    return category.words.length;
  }
  onPlayClick(): void {
    if (this.selectedCategory) {
      console.log('Selected category in dialog:', this.selectedCategory);
      this.dialogRef.close({ category: this.selectedCategory });
    }
  }


}  