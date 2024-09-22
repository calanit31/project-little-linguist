import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { GameResultsService } from '../services/game-results.service';
import { CategoriesService } from '../services/categories.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, MatCardModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit {
  currentPoints: number = 0;
  Games: number = 0;//כמות המשחקים 
  categoriesLearned: number = 0;//קטגוריות שנלמדו
  categoriesRemaining: number = 0;//קטגוריות שטרם נלמדו
  perfectGamesPercentage: number = 0;//אחוז המשחקים עם תוצאה 100
  mostPlayedCategory: string = '';//הקטדוריה ששוחקה הכי הרבה 
  categoriesLearnedPercentage: number = 0;//אחוז הקטגוריות שנלמדו
  monthlyChallenge: number = 0;// אתגר חודשי 
  consecutiveDays: number = 0;// ימי משחק רצופים

  constructor(
    private gameResultService: GameResultsService,
    private categoriesService: CategoriesService
  ) {}

  ngOnInit(): void {
    this.loadDashboardData();
  }

  loadDashboardData(): void {
    // כאן תהיה הלוגיקה לטעינת הנתונים האמיתיים מה-Firestore
    // לדוגמה:
    this.gameResultService.list().then((gameResultList) => {
      const categories: string[] = [];
      for (const result of gameResultList) {
        this.currentPoints += result.points;
        if (!categories.includes(result.categoryId)) {
          categories.push(result.categoryId);
        }
        if (result.points == 100) {
          this.perfectGamesPercentage++;
        }
      }
      this.Games = gameResultList.length;
      this.categoriesLearned = categories.length;
      this.categoriesService.list().then((categoryList) => {
        this.categoriesRemaining = categoryList.length - this.categoriesLearned;
      });
      this.perfectGamesPercentage =
        (this.perfectGamesPercentage / this.Games) * 100;
    });
    //this.currentPoints = 1000;
    //this.Games = 50;
    //this.categoriesLearned = 10;
    // this.categoriesRemaining = 5;
    //this.perfectGamesPercentage = 80;
   // this.mostPlayedCategory = 'Animals';
   // this.categoriesLearnedPercentage = 66;
   // this.monthlyChallenge = 15;
    //this.consecutiveDays = 7;
  }

  getRemainingGamesForChallenge(): number {
    return Math.max(0, 20 - this.monthlyChallenge);
  }

  getConsecutiveDaysMessage(): string {
    return `${this.consecutiveDays} `;
  }
}
