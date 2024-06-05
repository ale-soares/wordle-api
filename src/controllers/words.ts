import { Request, Response } from "express";

interface Word {
  id: Number;
  size: Number;
  title: String;
}

const words: Array<Word> = [
  { id: 0, size: 5, title: "pizza" },
  { id: 1, size: 5, title: "quack" },
  { id: 2, size: 5, title: "jumbo" },
  { id: 3, size: 5, title: "juicy" },
  { id: 4, size: 5, title: "crazy" },
  { id: 5, size: 5, title: "frizz" },
  { id: 6, size: 4, title: "jump" },
  { id: 7, size: 4, title: "joke" },
  { id: 8, size: 4, title: "zinc" },
  { id: 9, size: 6, title: "jojoba" },
];

const getWords = (req: Request, res: Response) => {
  return res.status(200).json({
    message: words,
  });
};

const getWord = (req: Request, res: Response) => {
  const randomWord = words[0];

  return res.status(200).json({
    message: randomWord,
  });
};

const getWordByLength = (req: Request, res: Response) => {
  const requiredLength = parseInt(req.params.size);
  const validWords = words.filter((word) => word.size === requiredLength);
  const randomWord = validWords[0];

  return res.status(200).json({
    message: randomWord,
  });
};

const addWord = (req: Request, res: Response) => {
  let word: Word = {
    id: req.body.id,
    size: req.body.size,
    title: req.body.title,
  };

  words.push(word);

  return res.status(200).json({
    message: words,
  });
};

export default { getWords, getWord, getWordByLength, addWord };
