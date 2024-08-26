import { Component, ElementRef, OnInit, ViewChild, ViewRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { CdkColumnDef } from '@angular/cdk/table';
import { Category } from '../../shared/model/category';
import { TranslatedWord } from '../../shared/model/translated-word';
import { categories } from '../../shared/data/categories';
import { ExitConfirmationDialogComponent } from '../exit-confirmation-dialog/exit-confirmation-dialog.component';

@Component({
  selector: 'app-word-sorter-game',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatDialogModule, MatButtonModule, ExitConfirmationDialogComponent],
  providers: [CdkColumnDef],
  templateUrl: './word-sorter-game.component.html',
  styleUrls: ['./word-sorter-game.component.css']
})
export class WordSorterGameComponent {
  usedWords = new Set<TranslatedWord>();
  currentWord!: TranslatedWord;
  currentCategory!: Category;
  level: number = 1;
  correctAnswers: Set<TranslatedWord> = new Set();
  incorrectAnswers: Set<TranslatedWord> = new Set();
  gameOver: boolean = false;

  constructor(private route: ActivatedRoute, private router: Router, private dialog: MatDialog) {
    this.nextTurn();
  }

  newGame() {
    this.gameOver = false;
    this.correctAnswers.clear();
    this.incorrectAnswers.clear();
    this.usedWords.clear();
    this.level = 1;
    this.nextTurn();
  }

  exit() {
    const dialogRef = this.dialog.open(ExitConfirmationDialogComponent); // פתיחת דיאלוג

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.router.navigate(['/game']); // נווט למסך בחירת המשחק אם המשתמש מאשר
      } else if (result === 'no') {
        this.newGame(); // התחל משחק חדש אם המשתמש בוחר "לא"
      }
    });
  }

  getRight() {
    return `calc(${100 - (this.level - 1) * 9}% + -56px)`;
  }

  getCategory(word: TranslatedWord) {
    return categories.find(c => c.words.find(w => w.origin === word.origin))?.name;
  }

  getRandom(): [Category, TranslatedWord] {
    const randomCategory = categories[Math.floor(Math.random() * categories.length)];
    let randCategoryForWord = categories[Math.floor(Math.random() * categories.length)];
    let randomWord = randCategoryForWord.words[Math.floor(Math.random() * randCategoryForWord.words.length)];

    while (this.usedWords.has(randomWord)) {
      randCategoryForWord = categories[Math.floor(Math.random() * categories.length)];
      randomWord = randCategoryForWord.words[Math.floor(Math.random() * randCategoryForWord.words.length)];
    }

    return [randomCategory, randomWord];
  }

  nextTurn() {
    const [category, word] = this.getRandom();
    this.currentCategory = category;
    this.currentWord = word;
    this.usedWords.add(word);
  }

  proceed() {
    this.level++;
    if (this.level < 10) {
      this.nextTurn();
    } else {
      this.finishGame();
    }
  }

  finishGame() {
    this.gameOver = true;
  }

  onYes() {
    if (this.gameOver) return;
    if (this.currentCategory.words.find(w => w.origin === this.currentWord.origin)) {
      this.correctAnswers.add(this.currentWord);
    } else {
      this.incorrectAnswers.add(this.currentWord);
    }
    this.proceed();
  }

  onNo() {
    if (this.gameOver) return;
    if (!this.currentCategory.words.find(w => w.origin === this.currentWord.origin)) {
      this.correctAnswers.add(this.currentWord);
    } else {
      this.incorrectAnswers.add(this.currentWord);
    }
    this.proceed();
  }
}
