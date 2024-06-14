import { Request, Response } from "express";
import Word from "./../models/word";

const getWords = async (req: Request, res: Response) => {
  try {
    const words = await Word.find({});

    res.send(words);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
};

const getWord = async (req: Request, res: Response) => {
  try {
    const word = await Word.aggregate().sample(1);

    res.send(word);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
};

const getWordByLength = async (req: Request, res: Response) => {
  const requiredLength = parseInt(req.params.size);

  try {
    const word = await Word.aggregate([
      { $match: { size: requiredLength } },
    ]).sample(1);

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
    const dbWord = await Word.findOne({ title: title });

    if (dbWord) {
      return res
        .status(304)
        .send("This word has already been added to Database");
    }

    const word = new Word({ size, title });
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
    const word = await Word.findOneAndDelete({ title: deleteTitle });

    res.send(word);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
};

export default { getWords, getWord, getWordByLength, addWord, deleteWord };
