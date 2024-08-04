import { Component,inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { Router } from '@angular/router';
import { GamesService } from '../services/game.service';

import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { DialogGameComponent } from '../dialog-game/dialog-game.component';
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
      width: '250px',
      data: { game: item }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if (result) {
        this.goTo(item);
      }
    });
  }



  goTo(item: any) {
    console.log(item.id);
    if (item.id == '1') {
      this.router.navigate(['trivia-options']);
    } else if (item.id == '2') {
      this.router.navigate(['mixed-latters']);
    } else if (item.id == '3') {
      this.router.navigate(['word-sorter']);
    }
  }


}
