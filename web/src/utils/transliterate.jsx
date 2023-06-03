const transliterate = (word) => {
  const dictionary = {
    ä: "a",
    ö: "o",
    å: "a",
    ø: "o",
    æ: "a",
    ü: "u",
  };

  return word
    .split("")
    .map((char) => dictionary[char] || char)
    .join("");
};

export default transliterate;
