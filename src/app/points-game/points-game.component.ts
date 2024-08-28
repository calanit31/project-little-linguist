import { Component, OnInit } from '@angular/core';
import { GamesService } from '../services/game.service';

@Component({
  selector: 'app-points-game',
  standalone: true,
  imports: [],
  templateUrl: './points-game.component.html',
  styleUrl: './points-game.component.css',
})
export class PointsGameComponent implements OnInit {
  public grade: number = 0;

  constructor(private gameService: GamesService) {}
  ngOnInit(): void {
    this.gameService.gradeListener().subscribe((grade: number) => {
      this.grade = grade;
    });
  }
}
