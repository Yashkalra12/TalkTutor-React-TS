import { generate } from "random-words";
import axios from "axios";
import _ from "lodash";

const generateMCQ = (
  meaning: {
    Text: string;
  }[],
  idx: number
): string[] => {
  const correctAns: string = meaning[idx].Text;

  const allMeaningExceptCorrect = meaning.filter(
    (word) => word.Text !== correctAns
  );

  const incorrectOptions: string[] = _.sampleSize(
    allMeaningExceptCorrect,
    3
  ).map((value) => value.Text);

  const mcqOptions = _.shuffle([...incorrectOptions, correctAns]);

  return mcqOptions;
};

export const translateWords = async (
  params: LanguageCodeType
): Promise<WordType[]> => {
  try {
    const words = generate(8).map((word) => ({
      Text: word,
    }));

    const response = await axios.post(
      "https://microsoft-translator-text.p.rapidapi.com/translate",
      words,
      {
        params: {
          "to[0]": params,
          "api-version": "3.0",
          profanityAction: "NoAction",
          textType: "plain",
        },
        headers: {
          "content-type": "application/json",
          "X-RapidAPI-Key": "38cea3fe45msh981cce4bc6e46a9p1b780ejsna7e67654dc8a",
          "X-RapidAPI-Host": "microsoft-translator-text.p.rapidapi.com",
        },
      }
    );

    const received: FetchedDataType[] = response.data;

    const arr: WordType[] = received.map((receivedWord, idx) => {
      const options: string[] = generateMCQ(words, idx);

      return {
        word: receivedWord.translations[0].text,
        meaning: words[idx].Text,
        options,
      };
    });

    return arr;
  } catch (error) {
    console.error(error);
    throw new Error("Error while fetching");
  }
};

export const countMatchingElements = (array1: string[], array2: string[]) => {
  if (array1.length !== array2.length) throw new Error("Arrays are not equal");

  let matchedCount = 0;

  for (let index = 0; index < array1.length; index++) {
    if (array1[index] === array2[index]) {
      matchedCount++;
    }
  }

  return matchedCount;
};

export const fetchAudio = async (
  text: string,
  language: LanguageCodeType
): Promise<string> => {
  const encodedParams = new URLSearchParams({
    src: text,
    r: "0",
    c: "mp3",
    f: "8khz_8bit_mono",
    b64: "true",
  });

  if (language === "ja") encodedParams.set("hl", "ja-jp");
  else if (language === "hi") encodedParams.set("hl", "hi-in");
  else if (language === "es") encodedParams.set("hl", "es-es");
  else if (language === "fr") encodedParams.set("hl", "fr-fr");

  const { data }: { data: string } = await axios.post(
    "https://voicerss-text-to-speech.p.rapidapi.com/",
    encodedParams,
    {
      params: {
        key: "38cea3fe45msh981cce4bc6e46a9p1b780ejsna7e67654dc8a",
      },
      headers: {
        "content-type": "application/x-www-form-urlencoded",
        "X-RapidAPI-Key": "38cea3fe45msh981cce4bc6e46a9p1b780ejsna7e67654dc8a",
        "X-RapidAPI-Host": "voicerss-text-to-speech.p.rapidapi.com",
      },
    }
  );

  return data;
};
