// src/app/services/game-results.service.ts
import { Injectable } from '@angular/core';

import { GameResult } from '../../shared/model/game-result';
//import { Observable } from 'rxjs';
import {
  collection,
  Firestore,
  addDoc,
  getDocs,
  DocumentSnapshot,
} from '@angular/fire/firestore';
import GameResultConverter from './converters/game-result-converter';

@Injectable({
  providedIn: 'root',
})
export class GameResultsService {
  private collectionName = 'gameResults';

  constructor(private firestoreService: Firestore) {}

  async addGameResult(gameResult: GameResult) {
    await addDoc(
      collection(this.firestoreService, this.collectionName).withConverter(
        GameResultConverter
      ),
      gameResult
    );
  }

  async list(): Promise<GameResult[]> {
    const gameResultCollection = collection(
      this.firestoreService,
      this.collectionName
    ).withConverter(GameResultConverter);
    const snapshot = await getDocs(gameResultCollection);
    const results: GameResult[] = [];
    snapshot.docs.forEach((docSnapshot: DocumentSnapshot<GameResult>) => {
      const data = docSnapshot.data();
      if (data) {
        results.push(data);
      }
    });
    return results;
  }
}
