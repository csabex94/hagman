import { ENGLISH_WORDS } from './words';

// Allow 6 guesses
export const maxWrong = 6;

// Return an array of img src
export const getImages = () => {
  let imgs = [];
  for (let i = 0; i < 7; i++) {
    imgs.push(`images/${i}.jpg`);
  }
  return imgs;
}

// Return random word from dictionary
export const randomWord = () => {
  return ENGLISH_WORDS[Math.floor(Math.random() * ENGLISH_WORDS.length)];
}

// Help with 2 random letters
export const helpLetters = (word) => {

  const letters = new Set();
  let ltr1 = "";
  let ltr2 = "";

  let ltr1Index = Math.floor(Math.random() * word.length);
  let ltr2Index = Math.floor(Math.random() * word.length);

  if (ltr1Index === ltr2Index) {
    ltr2Index = Math.floor(Math.random() * word.length);
  }

  ltr1 = word.charAt(ltr1Index);
  ltr2 = word.charAt(ltr2Index);
  letters.add(ltr1);
  letters.add(ltr2);

  return letters;
}