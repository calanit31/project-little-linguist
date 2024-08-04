import { Component,inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { Router } from '@angular/router';

import { GamesService } from '../services/game.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { DialogGameComponent } from '../dialog-game/dialog-game.component';
import { Category } from '../../shared/model/category';
@Component({
  selector: 'app-game-card',
  standalone: true,
  imports: [MatCardModule,MatDialogModule,CommonModule],
  templateUrl: './game-card.component.html',
  styleUrl: './game-card.component.css'
})
export class GameCardComponent {
  gameService = inject(GamesService);
  dialog = inject(MatDialog);
  
  constructor(private router: Router) {}

  openDialog(item: any): void {
    const dialogRef = this.dialog.open(DialogGameComponent, {
      width: '350px',
      data: { game: item }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      console.log('Dialog result:', result);
      if (result && result.category) {
        this.goTo(item, result.category);
      }
    });
  }
  
  goTo(item: any, category: Category) {
    console.log('Navigating to:', item.name, 'with category:', category);
    const route = this.getRoute(item.name);
    console.log('Route found:', route);
    if (route) {
      this.router.navigate([route], { queryParams: { category: JSON.stringify(category) } })
        .then(success => console.log('Navigation success:', success))
        .catch(err => console.log('Navigation error:', err));
    } else {
      console.log('No route found for game:', item.name);
    }
  }
  

  getRoute(gameName: string): string | null {
    switch (gameName) {
      case 'Mixed Letters':
        return 'mixed-latters-game';
      case 'Word Sorter':
        return 'word-sorter-game';
      case 'Trivia':
        return 'trivia-game';
      default:
        return null;
    }
  }
 }  