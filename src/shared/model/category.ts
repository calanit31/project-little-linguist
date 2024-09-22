import { Language } from './language';
import { TranslatedWord } from './translated-word';

export class Category {
  lastUpdateDate: Date = new Date();
  words: TranslatedWord[] = []
  constructor(
    public id: string,
    public name: string,
    public origin: Language,
    public target: Language,
    
  ) {}
}
