import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from '../../shared/model/category';
import { CategoriesService } from '../services/categories.service';
import { MatDialog } from '@angular/material/dialog';
import { ExitConfirmationDialogComponent } from '../exit-confirmation-dialog/exit-confirmation-dialog.component';
import { PointsGameComponent } from '../points-game/points-game.component';
import { CommonModule } from '@angular/common';
import { TranslatedWord } from '../../shared/model/translated-word';
import { FormsModule } from '@angular/forms';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { SuccessOrFailureDialogComponent } from '../success-or-failure-dialog/success-or-failure-dialog.component';
import { GamesService } from '../services/game.service';
import { MatInputModule } from '@angular/material/input';
import { GameResultsService } from '../services/game-results.service';
import { GameResult } from '../../shared/model/game-result';

@Component({
  selector: 'app-mixed-letters-game',
  standalone: true,
  imports: [
    PointsGameComponent,
    CommonModule,
    FormsModule,
    MatProgressBarModule,
    MatIconModule,
    MatTableModule,
    MatInputModule,
  ],
  templateUrl: './mixed-letters-game.component.html',
  styleUrl: './mixed-letters-game.component.css',
})
export class MixedLettersGameComponent implements OnInit {
  category: Category | null = null;
  currentWordIndex = 0;
  currentWord: TranslatedWord | null = null;
  shuffledWord = '';
  userGuess = '';
  progressValue = 0;
  pointsPerWord = 0;
  gameFinished = false;
  correctAnswers = 0;
  summaryData: (TranslatedWord & { success: boolean })[] = [];

  constructor(
    private route: ActivatedRoute,
    private categoryService: CategoriesService,
    private dialog: MatDialog,
    private router: Router,
    private gameService: GamesService,
    private gameResultService: GameResultsService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      if (params['id']) {
        this.categoryService.getCatgoryById(params['id']).then((category) => {
          this.category = category;
          if (this.category) {
            this.gameService.initGrade();
            this.pointsPerWord = Math.floor(100 / this.category.words.length);
            this.setCurrentWord();
          }
        });
      }
    });
  }

  setCurrentWord() {
    if (this.category && this.category.words) {
      this.currentWord = this.category.words[this.currentWordIndex];
      this.shuffledWord = this.shuffleWord(this.currentWord.origin);
      this.progressValue =
        (this.currentWordIndex / this.category.words.length) * 100;
    }
  }

  shuffleWord(word: string): string {
    return word
      .split('')
      .sort(() => Math.random() - 0.5)
      .join('');
  }

  submitGuess() {
    if (this.userGuess.trim().length == 0) {
      this.dialog.open(SuccessOrFailureDialogComponent, {
        data: 'Please enter an English word',
      });
      return;
    }
    for (let i = 0; i < this.userGuess.length; i++) {
      if (
        this.userGuess[i].toLowerCase() < 'a' ||
        this.userGuess[i].toLowerCase() > 'z'
      ) {
        this.dialog.open(SuccessOrFailureDialogComponent, {
          data: 'Please use only English letters',
        });
        return;
      }
    }
    if (this.currentWord && this.category) {
      const isCorrect =
        this.userGuess.toLowerCase() === this.currentWord.origin.toLowerCase();

      if (isCorrect) {
        this.gameService.addGrade(this.pointsPerWord);
        this.correctAnswers++;
      }

      this.summaryData.push({ ...this.currentWord, success: isCorrect });

      this.dialog.open(SuccessOrFailureDialogComponent, {
        data: isCorrect ? 'success!' : 'failed',
      });

      this.currentWordIndex++;
      if (this.currentWordIndex < this.category.words.length) {
        this.setCurrentWord();
      } else {
        this.gameFinished = true;
        this.addGameResult();
      }

      this.userGuess = '';
    }
  }

  getGrade() {
    return this.gameService.getGrade();
  }
  getStepNumber() {
    if (this.category) {
      if (this.currentWordIndex < this.category.words.length) {
        return this.currentWordIndex + 1;
      }
      return this.currentWordIndex;
    }
    return 0;
  }

  resetGuess() {
    this.userGuess = '';
  }
  readonly gameId = 'mixed-letters';
  addGameResult() {
    const gameRsult = new GameResult(
      this.category!.id,
      this.gameId,
      new Date(),
      this.gameService.getGrade()
    );
    this.gameResultService.addGameResult(gameRsult);
  }
  newGame() {
    this.correctAnswers = 0;
    this.currentWordIndex = 0;
    this.userGuess = '';
    this.gameService.initGrade();
    this.gameFinished = false;
    this.summaryData = [];
    this.setCurrentWord();
  }

  exit() {
    const dialogRef = this.dialog.open(ExitConfirmationDialogComponent);
    dialogRef.afterClosed().subscribe((result) => {
      if (result === true) {
        this.router.navigate(['/game']);
      } else if (result === 'no') {
        console.log();
      }
    });
  }
}
