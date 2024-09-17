import {
  QueryDocumentSnapshot,
  SnapshotOptions,
} from '@angular/fire/firestore';
import { Category } from '../../../shared/model/category';

//Property 'toFirestore' is missing in type '{ toFireStore: (gameRegult: GameResult) => GameResult;
//fromFirestore: (snapshot: QueryDocumentSnapshot, options: SnapshotOptions) => GameResult; }'

const CategoriesConverter = {
  toFirestore: (category: Category) => {
    return {
      id: category.id,
      name: category.name,
      origin: category.origin,
      target: category.target,
    };
  },
  fromFirestore: (
    snapshot: QueryDocumentSnapshot,
    options: SnapshotOptions
  ): Category => {
    const data = snapshot.data(options);
    const category = new Category(
      snapshot.id,
      data['name'],
      data['origin'],
      data['target']
    );
    return category;
  },
};

export default CategoriesConverter;
