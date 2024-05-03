/// <reference types="vite/client" />

type LanguageType = {
    name: string;
    code: string;
  };
  
  type LanguageCodeType = "ja" | "hi" | "es" | "fr";
  
  type WordType = {
    word: string;
    meaning: string;
    options: string[];
  };
  
  type StateType = {
    loading: boolean;
    result: string[];
    words: WordType[];
    error?: string;
  };
  
  type FetchedDataType = {
    translations: {
      text: string;
    }[];
  };
  