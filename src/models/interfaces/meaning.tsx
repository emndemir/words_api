import { Definition } from "./definition";

export interface Meaning {
    partOfSpeech: string;
    definitions: Definition[];
    synonyms: string[];
    antonyms: string[];
  }