import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from '../../shared/model/category';
import { CategoriesService } from '../services/categories.service';
import { ExitConfirmationDialogComponent } from '../exit-confirmation-dialog/exit-confirmation-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { PointsGameComponent } from '../points-game/points-game.component';
import { TranslatedWord } from '../../shared/model/translated-word';
import { Subscription } from 'rxjs';
import { GamesService } from '../services/game.service';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@Component({
  selector: 'app-trivia-game',
  standalone: true,
  imports: [
    ExitConfirmationDialogComponent,
    PointsGameComponent,
    CommonModule,
    MatIconModule,
    MatProgressBarModule,
  ],
  templateUrl: './trivia-game.component.html',
  styleUrl: './trivia-game.component.css',
})
export class TriviaGameComponent implements OnInit {
  category: Category | null = null;
  currentWord: TranslatedWord | null = null;
  currentOptions: string[] = [];
  private words: TranslatedWord[] = [];
  private subscription: Subscription | null = null;
  progressValue = 0;

  constructor(
    private route: ActivatedRoute,
    private categoryService: CategoriesService,
    private gamesService: GamesService,
    private dialog: MatDialog,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      if (params['id']) {
        this.categoryService.getCatgoryById(params['id']).then((category) => {
          this.category = category;
          if (this.category) {
            this.words = [...this.category.words];
            this.shuffleArray(this.words);
            this.nextWord();
          }
        });
      }
    });

    this.gamesService.initGrade();
  }

  getGrade(): number {
    return this.gamesService.getGrade();
  }

  nextWord(): void {
    if (this.words.length > 0) {
      this.currentWord = this.words.pop() || null;
      if (this.currentWord) {
        this.generateOptions();
      }
    } else {
      // משחק הסתיים
      this.showGameOverDialog();
    }
  }

  generateOptions(): void {
    if (this.currentWord && this.category) {
      this.currentOptions = [this.currentWord.target];
      const otherWords = this.category.words.filter(
        (w) => w !== this.currentWord
      );
      this.shuffleArray(otherWords);
      this.currentOptions.push(...otherWords.slice(0, 3).map((w) => w.target));
      this.shuffleArray(this.currentOptions);
    }
  }

  checkAnswer(selectedOption: string): void {
    if (this.currentWord && selectedOption === this.currentWord.target) {
      this.gamesService.addGrade(10); // תוסיף 10 נקודות לתשובה נכונה
      // הצג הודעת הצלחה
    } else {
      this.gamesService.addGrade(-5); // הורד 5 נקודות לתשובה שגויה
      // הצג הודעת כישלון
    }
    this.nextWord();
  }

  exit(): void {
    const dialogRef = this.dialog.open(ExitConfirmationDialogComponent);
    dialogRef.afterClosed().subscribe((result) => {
      if (result === true) {
        this.router.navigate(['/game']);
      }
    });
  }

  private shuffleArray<T>(array: T[]): void {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  private showGameOverDialog(): void {
    // הצג דיאלוג סיום משחק עם הניקוד הסופי
  }
}
