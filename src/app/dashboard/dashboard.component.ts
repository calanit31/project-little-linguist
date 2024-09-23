import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { GameResultsService } from '../services/game-results.service';
import { CategoriesService } from '../services/categories.service';
import { GamesService } from '../services/game.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, MatCardModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit {
  currentPoints: number = 0;
  Games: number = 0; //כמות המשחקים
  categoriesLearned: number = 0; //קטגוריות שנלמדו
  categoriesRemaining: number = 0; //קטגוריות שטרם נלמדו
  perfectGamesPercentage: number = 0; //אחוז המשחקים עם תוצאה 100
  mostPlayedCategory: string = ''; //הקטדוריה ששוחקה הכי הרבה
  monthlyChallenge: number = 20; // אתגר חודשי
  completedChallenge: number = 0; // כמה שיחקו החודש
  consecutiveDays: number = 0; // ימי משחק רצופים
  mostAverageGame: string = ''; // סוכ המשחק עם הציון ממוצע גבוה ביו,ר

  constructor(
    private gameResultService: GameResultsService,
    private categoriesService: CategoriesService,
    private gameService: GamesService
  ) {}

  ngOnInit(): void {
    this.loadDashboardData();
  }

  loadDashboardData(): void {
    this.gameResultService.list().then((gameResultList) => {
      const categories: string[] = [];
      const gameMap = new Map<string, { sum: number; count: number }>();
      const categoryCountMap = new Map<string, number>();
      const now = new Date();

      for (const result of gameResultList) {
        if (result.date.getMonth() == now.getMonth()) {
          this.completedChallenge++;
        }
        if (!gameMap.has(result.gameId)) {
          gameMap.set(result.gameId, { sum: 0, count: 0 });
        }
        const gameStats = gameMap.get(result.gameId)!;
        gameStats.sum += result.points;
        gameStats.count++;
        gameMap.set(result.gameId, gameStats);

        this.currentPoints += result.points;
        if (!categories.includes(result.categoryId)) {
          categories.push(result.categoryId);
        }
        if (result.points == 100) {
          this.perfectGamesPercentage++;
        }

        if (!categoryCountMap.has(result.categoryId)) {
          categoryCountMap.set(result.categoryId, 0);
        }
        categoryCountMap.set(
          result.categoryId,
          categoryCountMap.get(result.categoryId)! + 1
        );
      }
      this.Games = gameResultList.length;
      this.categoriesLearned = categories.length;
      this.categoriesService.list().then((categoryList) => {
        this.categoriesRemaining = categoryList.length - this.categoriesLearned;
      });
      this.perfectGamesPercentage = Math.floor(
        (this.perfectGamesPercentage / this.Games) * 100
      );

      let maxCat = 0;
      let maxCatId = '';
      for (const key of categoryCountMap.keys()) {
        const count = categoryCountMap.get(key)!;
        if (count > maxCat) {
          maxCat = count;
          maxCatId = key;
        }
      }
      this.categoriesService
        .getCatgoryById(maxCatId)
        .then((category) => (this.mostPlayedCategory = category!.name));

      let maxGameAvgPoints = 0;

      for (const key of gameMap.keys()) {
        const gameStats = gameMap.get(key)!;
        const avg = gameStats.sum / gameStats.count;
        if (avg > maxGameAvgPoints) {
          maxGameAvgPoints = avg;
          this.mostAverageGame = key;
        }
      }
    });
  }

  getRemainingGamesForChallenge(): number {
    return this.monthlyChallenge - this.completedChallenge;
  }

  getConsecutiveDaysMessage(): string {
    this.consecutiveDays = 0;
    const date = new Date();
    date.setDate(date.getDate() - 1);
    this.gameResultService.list().then((gameList) => {
      let flag = true;
      while (flag) {
        flag = false;
        for (let i = 0; i < gameList.length; i++) {
          const game = gameList[i];
          if (
            game.date.getFullYear() == date.getFullYear() &&
            game.date.getMonth() == date.getMonth() &&
            game.date.getDay() == date.getDay()
          ) {
            this.consecutiveDays++;
            date.setDate(date.getDate() - 1);
            flag = true;
          }
        }
      }
    });
    return `${this.consecutiveDays} `;
  }
}
