import { Request, Response } from "express";

interface Word {
  id: Number;
  length: Number;
  title: String;
}

const words: Array<Word> = [
  { id: 0, length: 5, title: "pizza" },
  { id: 1, length: 5, title: "quack" },
  { id: 2, length: 5, title: "jumbo" },
  { id: 3, length: 5, title: "juicy" },
  { id: 4, length: 5, title: "crazy" },
  { id: 5, length: 5, title: "frizz" },
  { id: 6, length: 4, title: "jump" },
  { id: 7, length: 4, title: "joke" },
  { id: 8, length: 4, title: "zinc" },
  { id: 9, length: 6, title: "jojoba" },
];

const getWord = (req: Request, res: Response) => {
  console.log("word");
  const randomWord = words[0];

  return res.status(200).json({
    message: randomWord,
  });
};

const getWordByLength = (req: Request, res: Response) => {
  const requiredLength = parseInt(req.params.length);
  const validWords = words.filter((word) => word.length === requiredLength);
  const randomWord = validWords[0];

  return res.status(200).json({
    message: randomWord,
  });
};

export default { getWord, getWordByLength };
