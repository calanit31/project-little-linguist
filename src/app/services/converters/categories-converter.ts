import {
  QueryDocumentSnapshot,
  SnapshotOptions,
  Timestamp,
} from '@angular/fire/firestore';
import { Category } from '../../../shared/model/category';
import { TranslatedWord } from '../../../shared/model/translated-word';
import { Language } from '../../../shared/model/language';

interface FirestoreTranslatedWord {
  origin: string;
  target: string;
  // word: string;
}

interface FirestoreCategory {
  id: string;
  name: string;
  origin: Language;
  target: Language;
  lastUpdateDate: Timestamp;
  words: FirestoreTranslatedWord[];
}

const CategoriesConverter = {
  toFirestore: (category: Category): FirestoreCategory => {
    return {
      id: category.id,
      name: category.name,
      origin: category.origin,
      target: category.target,
      lastUpdateDate: Timestamp.fromDate(category.lastUpdateDate),
      words: category.words.map((word) => ({
        origin: word.origin,
        target: word.target,

      })),
    };
  },
  fromFirestore: (
    snapshot: QueryDocumentSnapshot,
    options: SnapshotOptions
  ): Category => {
    const data = snapshot.data(options) as FirestoreCategory;
    const category = new Category(data.id, data.name, data.origin, data.target);
    category.lastUpdateDate = data.lastUpdateDate.toDate();
    category.words = data.words.map(
      (word) => new TranslatedWord(word.origin, word.target)
    );
    return category;
  },
};

export default CategoriesConverter;
