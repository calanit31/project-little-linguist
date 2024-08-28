export class TranslatedWord {
    guess:string;
  english!: string;
    constructor(
        public origin : string,
        public target: string) 
        {
            this.guess=""
        }
}