import { Component,inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { Router } from '@angular/router';
import { GamesService } from '../services/game.service';
@Component({
  selector: 'app-game-card',
  standalone: true,
  imports: [MatCardModule],
  templateUrl: './game-card.component.html',
  styleUrl: './game-card.component.css'
})
export class GameCardComponent {
  
  constructor(private router: Router) {}


  gameService = inject(GamesService)


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
