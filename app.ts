import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import routes from "./src/routes/words";
import mongoose from "mongoose";

const router: Express = express();
const port = process.env.PORT || 3000;

dotenv.config();

router.use(express.urlencoded({ extended: false }));
router.use(express.json());
router.use("/", routes);

mongoose
  .connect(
    `mongodb+srv://${process.env.DB_USR}:${process.env.DB_PSW}@wordle.mtgtogc.mongodb.net/?retryWrites=true&w=majority&appName=Wordle`
  )
  .catch((err) => console.log(err));

router.get("/", (req: Request, res: Response) => {
  res.send("Wordle API - Built with Node, Express, TS & MongoDB");
});

router.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
