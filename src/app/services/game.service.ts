import { Injectable } from '@angular/core';
import { GameProfile } from '../../shared/model/game-profile';

@Injectable({
  providedIn: 'root',
})
export class GamesService {
  private games: GameProfile[] = [
    new GameProfile(
      '1',
      'Trivia',
      'Choose every words translation from a list of 4 option',
      'trivia-game'
    ),
    new GameProfile(
      '2',
      'Mixed Letters',
      ' Practice spelling by finding the right order of letters for every word in the category',
      'mixed-latters-game'
    ),
    new GameProfile(
      '3',
      'Word Sorter',
      'Generate the game description',
      'word-sorter-game'
    ),
  ];
  getGames(): GameProfile[] {
    return this.games;
  }
}
