export class TranslatedWord {
  
  public guess: string;
  public english: string;

  public word: string;

  constructor(
    public origin: string, 
    public target: string   
  ) {
    this.guess = "";
    this.english = origin; 
    this.word = origin;   
  }
}
