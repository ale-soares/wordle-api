import express from "express";
import controller from "./../controllers/words";

const router = express.Router();

router.get("/word", controller.getWord);
router.get("/word/:length", controller.getWordByLength);

export default router;
