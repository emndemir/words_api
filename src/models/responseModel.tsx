import { License } from "./interfaces/license";
import { Meaning } from "./interfaces/meaning";
import { Phonetic } from "./interfaces/phonetic";

export interface ResponseModel {
    word: string;
    phonetic: string;
    phonetics: Phonetic[];
    meanings: Meaning[];
    license: License;
    sourceUrls: string[];
  }