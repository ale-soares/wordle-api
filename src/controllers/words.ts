import { Request, Response } from "express";
import Word, { IWord, TWord } from "./../models/word";

const response = { 404: "Word not found" };

const getWords = async (req: Request, res: Response) => {
  try {
    const words: IWord[] = await Word.find({});

    res.send(words);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
};

const getWord = async (req: Request, res: Response) => {
  try {
    const word = await Word.aggregate<IWord>().sample(1);

    res.send(word);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
};

const getWordByLength = async (req: Request, res: Response) => {
  const requiredLength = parseInt(req.params.size);

  try {
    const word = await Word.aggregate<IWord>([
      { $match: { size: requiredLength } },
    ]).sample(1);

    if (!word) {
      return res.status(404).send(response[404]);
    }

    res.send(word);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
};

const addWord = async (req: Request, res: Response) => {
  const { title } = req.body;
  const size = title.length;

  try {
    const dbWord = await Word.findOne<IWord>({ title: title });

    if (dbWord) {
      return res.status(304);
    }

    const newWord: TWord = { size, title };
    const word = new Word(newWord);
    await word.save();

    res.send(word);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
};

const deleteWord = async (req: Request, res: Response) => {
  const deleteTitle = req.params.title;

  try {
    const word = await Word.findOneAndDelete<IWord>({ title: deleteTitle });

    if (!word) {
      return res.status(404).send(response[404]);
    }

    res.send(word);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
};

export default { getWords, getWord, getWordByLength, addWord, deleteWord };
