export const letters = [
  ["a", "b", "c", "d", "e", "f", "g", "h", "i"],
  ["j", "k", "l", "m", "n", "o", "p", "q", "r"],
  ["s", "t", "u", "v", "w", "x", "y", "z", ""],
  ["", "", "", "", "", "", "", "", ""],
];

export const shuffle = () => {
  const array = [0, 1, 2, 3, 4, 5, 6, 7, 8];
  var currentIndex = array.length,
    temporaryValue,
    randomIndex;
  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
};
