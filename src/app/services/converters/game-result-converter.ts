import {
  QueryDocumentSnapshot,
  SnapshotOptions,
  Timestamp,
} from '@angular/fire/firestore';
import { GameResult } from '../../../shared/model/game-result';

//Property 'toFirestore' is missing in type '{ toFireStore: (gameRegult: GameResult) => GameResult;
//fromFirestore: (snapshot: QueryDocumentSnapshot, options: SnapshotOptions) => GameResult; }'

const GameResultConverter = {
  toFirestore: (gameResult: GameResult) => {
    return {
        //userId: gameResult.userId,
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
      //snapshot.id,
      //data['userId'],
      data['categoryId'],
      data['gameId'],
      data['date'].toDate(),
      data['points']
    );
    return gameResult;
  },
};

export default GameResultConverter;
