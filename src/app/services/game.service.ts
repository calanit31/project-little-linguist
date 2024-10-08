import { Injectable } from '@angular/core';
import { GameProfile } from '../../shared/model/game-profile';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GamesService {
  private grade: number = 0;
  private gradeSubject = new Subject<number>();

  public gradeListener() {
    return this.gradeSubject.asObservable();
  }

  public addGrade(grade: number) {
    if (this.grade + grade < 0) {
      return;
    } else if (this.grade + grade * 2 > 100) {
      this.grade = 100;
    } else {
      this.grade += grade;
    }
    this.gradeSubject.next(this.grade);
  }
  public initGrade() {
    this.grade = 0;
    this.gradeSubject.next(this.grade);
  }

  public getGrade() {
    return this.grade;
  }
  private games: GameProfile[] = [
    new GameProfile(
      '1',
      'Mixed Letters',
      ' Practice spelling by finding the right order of letters for every word in the category',
      'mixed-latters-game'
    ),
    new GameProfile(
      '2',
      'Word Sorter',
      'Generate the game description',
      'word-sorter-game'
    ),
  ];
  getGames(): GameProfile[] {
    return this.games;
  }
}
