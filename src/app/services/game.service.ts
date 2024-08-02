import { Injectable } from '@angular/core';
import { GameProfile } from '../../shared/model/game-profile';

@Injectable({
  providedIn: 'root'
})
export class GamesService {
  private games: GameProfile[] = [
    new GameProfile('1', 'Trivia','Choose every words translation from a list of 4 option', '/trivia'),
    new GameProfile('2', 'Mixed Letters', ' Practice spelling by finding the right order of letters for every word in the category', '/mixed-lettres'),
    new GameProfile('3', 'Word Sorter', 'Generate the game description', '/word-sorting'),
  ];
  getGames(): GameProfile[] {
    return this.games;
  }
}