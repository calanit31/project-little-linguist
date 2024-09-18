import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule,MatCardModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit{
  currentPoints: number = 0;
  Games: number = 0;
  categoriesLearned: number = 0;
  categoriesRemaining: number = 0;
  perfectGamesPercentage: number = 0;
  mostPlayedCategory: string = '';
  categoriesLearnedPercentage: number = 0;
  monthlyChallenge: number = 0;
  consecutiveDays: number = 0;

  constructor() { }

  ngOnInit(): void {
    this.loadDashboardData();
  }

  loadDashboardData(): void {
    // כאן תהיה הלוגיקה לטעינת הנתונים האמיתיים מה-Firestore
    // לדוגמה:
    this.currentPoints = 1000;
    this.Games = 50;
    this.categoriesLearned = 10;
    this.categoriesRemaining = 5;
    this.perfectGamesPercentage = 80;
    this.mostPlayedCategory = 'Animals';
    this.categoriesLearnedPercentage = 66;
    this.monthlyChallenge = 15;
    this.consecutiveDays = 7;
  }

  getRemainingGamesForChallenge(): number {
    return Math.max(0, 20 - this.monthlyChallenge);
  }

  getConsecutiveDaysMessage(): string {
    return `${this.consecutiveDays} ימים רצופים`;
  }
}

