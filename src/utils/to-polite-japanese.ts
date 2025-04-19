export const toPoliteJapanese = (input: string): string => {
  const politeEndings = [
    'です',
    'ます',
    'でございます',
    'だと思います',
    'でしょう',
  ];
  const randomEnding =
    politeEndings[Math.floor(Math.random() * politeEndings.length)];
  return input + randomEnding;
};
