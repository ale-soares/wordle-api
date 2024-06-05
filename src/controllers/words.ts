import { Request, Response } from "express";

interface Word {
  size: Number;
  title: String;
}

let words: Array<Word> = [
  { size: 5, title: "pizza" },
  { size: 5, title: "quack" },
  { size: 5, title: "jumbo" },
  { size: 5, title: "juicy" },
  { size: 5, title: "crazy" },
  { size: 5, title: "frizz" },
  { size: 4, title: "jump" },
  { size: 4, title: "joke" },
  { size: 4, title: "zinc" },
  { size: 6, title: "jojoba" },
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
  let newWord: Word = {
    size: req.body.size,
    title: req.body.title,
  };

  const word = words.find((word) => word.title === newWord.title);

  if (word) {
    return res.status(202).json({
      message: "word is already registered",
    });
  }

  words.push(newWord);

  return res.status(200).json({
    message: words,
  });
};

const deleteWord = (req: Request, res: Response) => {
  const deleteTitle = req.params.title;
  const word = words.find((word) => word.title === deleteTitle);

  if (word) {
    const id = words.indexOf(word);
    words.splice(id, 1);

    return res.status(200).json({
      message: "word deleted successfully",
    });
  }

  return res.status(404).json({
    message: "word not found",
  });
};

export default { getWords, getWord, getWordByLength, addWord, deleteWord };
