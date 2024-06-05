import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import routes from "./src/routes/words";

const router: Express = express();
const port = process.env.PORT || 3000;

dotenv.config();

router.use(express.urlencoded({ extended: false }));
router.use(express.json());
router.use("/", routes);

router.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

router.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
