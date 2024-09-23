import {
  QueryDocumentSnapshot,
  SnapshotOptions,
  Timestamp,
} from '@angular/fire/firestore';
import { GameResult } from '../../../shared/model/game-result';

const GameResultConverter = {
  toFirestore: (gameResult: GameResult) => {
    return {
      categoryId: gameResult.categoryId,
      gameId: gameResult.gameId,
      date: Timestamp.fromDate(gameResult.date),
      points: gameResult.points,
    };
  },
  fromFirestore: (
    snapshot: QueryDocumentSnapshot,
    options: SnapshotOptions
  ): GameResult => {
    const data = snapshot.data(options);
    const gameResult = new GameResult(
      data['categoryId'],
      data['gameId'],
      data['date'].toDate(),
      data['points']
    );
    return gameResult;
  },
};

export default GameResultConverter;
