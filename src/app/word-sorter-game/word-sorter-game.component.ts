import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { CdkColumnDef } from '@angular/cdk/table';
import { Category } from '../../shared/model/category';
import { TranslatedWord } from '../../shared/model/translated-word';
import { ExitConfirmationDialogComponent } from '../exit-confirmation-dialog/exit-confirmation-dialog.component';
import { CategoriesService } from '../services/categories.service';
import { SuccessOrFailureDialogComponent } from '../success-or-failure-dialog/success-or-failure-dialog.component';
import { PointsGameComponent } from '../points-game/points-game.component';
import { GamesService } from '../services/game.service';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { GameResultsService } from '../services/game-results.service';
import { GameResult } from '../../shared/model/game-result';

@Component({
  selector: 'app-word-sorter-game',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatDialogModule,
    MatButtonModule,
    ExitConfirmationDialogComponent,
    PointsGameComponent,
    MatIconModule,
    MatProgressBarModule,
  ],
  providers: [CdkColumnDef],
  templateUrl: './word-sorter-game.component.html',
  styleUrls: ['./word-sorter-game.component.css'],
})
export class WordSorterGameComponent implements OnInit {
  usedWords = new Set<TranslatedWord>();
  selectedWords: TranslatedWord[] = [];
  currentWord!: TranslatedWord;
  currentCategory: Category | undefined;
  randomCategory: Category | undefined;
  level: number = 1;
  correctAnswers: Set<TranslatedWord> = new Set();
  incorrectAnswers: Set<TranslatedWord> = new Set();
  gameOver: boolean = false;
  private point: number = 0;
  progressValue = 0;
  categoryList: Category[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog,
    private categoryService: CategoriesService,
    private gameService: GamesService,
    private gameResultService: GameResultsService
  ) {}
  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      if (params['id']) {
        this.categoryService.list().then((categoryList) => {
          this.categoryList = categoryList;
          for (const cat of this.categoryList) {
            if (cat.id == params['id']) {
              this.currentCategory = cat;
            }
          }
          this.gameService.initGrade();
          this.point = Math.floor(100 / 6);
          this.generateRandomCategory();
          this.generateWords();
          this.nextTurn();
        });
      }
    });
  }
  readonly gameId = 'word-sorter';
  addGameResult() {
    const gameRsult = new GameResult(
      this.currentCategory!.id,
      this.gameId,
      new Date(),
      this.gameService.getGrade()
    );
    this.gameResultService.addGameResult(gameRsult);
  }

  newGame() {
    this.progressValue = 0;
    this.gameOver = false;
    this.correctAnswers.clear();
    this.incorrectAnswers.clear();
    this.usedWords.clear();
    this.level = 1;
    this.gameService.initGrade();
    this.selectedWords = [];
    this.generateRandomCategory();
    this.generateWords();
    this.nextTurn();
  }

  exit() {
    const dialogRef = this.dialog.open(ExitConfirmationDialogComponent);

    dialogRef.afterClosed().subscribe((result) => {
      if (result === true) {
        this.router.navigate(['/game']);
      } else if (result === 'no') {
        this.newGame();
      }
    });
  }

  getRight() {
    return `calc(${100 - (this.level - 1) * 9}% + -56px)`;
  }

  getCategory(word: TranslatedWord) {
    return this.categoryList.find((c) =>
      c.words.find((w) => w.origin === word.origin)
    )?.name;
  }

  generateRandomCategory() {
    this.randomCategory =
      this.categoryList[Math.floor(Math.random() * this.categoryList.length)];

    while (this.randomCategory.id === this.currentCategory!.id) {
      this.randomCategory =
        this.categoryList[Math.floor(Math.random() * this.categoryList.length)];
    }
  }

  generateWords() {
    const wordSet = new Set<TranslatedWord>();
    for (let i = 0; i < 3; i++) {
      let word =
        this.currentCategory!.words[
          Math.floor(Math.random() * this.currentCategory!.words.length)
        ];
      while (wordSet.has(word)) {
        word =
          this.currentCategory!.words[
            Math.floor(Math.random() * this.currentCategory!.words.length)
          ];
      }
      wordSet.add(word);
    }
    for (let i = 0; i < 3; i++) {
      let word =
        this.randomCategory!.words[
          Math.floor(Math.random() * this.randomCategory!.words.length)
        ];
      while (wordSet.has(word)) {
        word =
          this.randomCategory!.words[
            Math.floor(Math.random() * this.randomCategory!.words.length)
          ];
      }
      wordSet.add(word);
    }
    for (const word of wordSet) {
      this.selectedWords.push(word);
    }
    for (let i = 0; i < 3; i++) {
      const index = Math.floor(Math.random() * this.selectedWords.length);
      const temp = this.selectedWords[i];
      this.selectedWords[i] = this.selectedWords[index];
      this.selectedWords[index] = temp;
    }
  }

  nextTurn() {
    const word = this.selectedWords.pop()!;

    this.currentWord = word;
    this.usedWords.add(word);
    this.progressValue = ((this.level - 1) / 6) * 100;
  }

  proceed() {
    this.level++;
    if (this.level <= 6) {
      this.nextTurn();
    } else {
      this.finishGame();
    }
  }

  finishGame() {
    this.addGameResult();
    this.gameOver = true;
  }

  onYes() {
    if (this.gameOver || !this.currentCategory) return;
    if (
      this.currentCategory.words.find(
        (w) => w.origin === this.currentWord.origin
      )
    ) {
      this.correctAnswers.add(this.currentWord);
      this.gameService.addGrade(this.point);
      this.openDialog('success!');
    } else {
      this.incorrectAnswers.add(this.currentWord);
      this.openDialog('failed');
    }
  }

  onNo() {
    if (this.gameOver || !this.currentCategory) return;
    if (
      !this.currentCategory.words.find(
        (w) => w.origin === this.currentWord.origin
      )
    ) {
      this.correctAnswers.add(this.currentWord);
      this.gameService.addGrade(this.point);
      this.openDialog('success');
    } else {
      this.incorrectAnswers.add(this.currentWord);
      this.openDialog('failed');
    }
  }
  public getGrade() {
    return this.gameService.getGrade();
  }
  openDialog(message: string) {
    const dialogRef = this.dialog.open(SuccessOrFailureDialogComponent, {
      width: '350px',
      data: message,
    });
    dialogRef.afterClosed().subscribe(() => {
      this.proceed();
    });
  }
}
