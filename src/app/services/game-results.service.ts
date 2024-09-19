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

  // הוספת GameResult
  async addGameResult(gameResult: GameResult) {
    //Promise<void>
    // page 38
    await addDoc(
      collection(this.firestoreService, this.collectionName).withConverter(
        GameResultConverter
      ),
      gameResult
    );
    //const id = this.firestoreService.createId();
    //return this.firestoreService.collection(this.collectionName).doc(id).set({ ...gameResult, id });
  }

  // שליפת רשימת המשחקים של המשתמש הנוכחי
  async list(): Promise<GameResult[]> {
    // page 55
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
    // return this.firestoreService.collection<GameResult>(this.collectionName, ref => ref.where('userId', '==', userId))
    //   .valueChanges({ idField: 'id' });
  }
}
