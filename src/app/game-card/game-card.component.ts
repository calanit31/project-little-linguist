import { Component, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { Router } from '@angular/router';

import { GamesService } from '../services/game.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { DialogGameComponent } from '../dialog-game/dialog-game.component';
import { Category } from '../../shared/model/category';
import { GameProfile } from '../../shared/model/game-profile';
import { CategoriesService } from '../services/categories.service';
@Component({
  selector: 'app-game-card',
  standalone: true,
  imports: [MatCardModule, MatDialogModule, CommonModule],
  templateUrl: './game-card.component.html',
  styleUrl: './game-card.component.css',
})
export class GameCardComponent {
  gameService = inject(GamesService);
  dialog = inject(MatDialog);

  constructor(
    private router: Router,
    private categoryService: CategoriesService
  ) {}

  openDialog(item: GameProfile): void {
    const dialogRef = this.dialog.open(DialogGameComponent, {
      width: '350px',
      data: { game: item },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('Dialog result:', result);
      if (result && result.category) {
        this.goTo(item, result.category);
      }
    });
  }

  goTo(item: GameProfile, category: Category) {
    this.router.navigate([`${item.url}/${category.id}`]);
  }

  getRoute(gameName: string): string | null {
    switch (gameName) {
      case 'Mixed Letters':
        return 'mixed-latters-game';
      case 'Word Sorter':
        return 'word-sorter-game';
     // case 'Trivia':
       // return 'trivia-game';
      default:
        return null;
    }
  }
}
