import express from "express";
import controller from "./../controllers/words";

const router = express.Router();

router.get("/words", controller.getWords);
router.get("/word", controller.getWord);
router.get("/word/:size", controller.getWordByLength);
router.post("/words", controller.addWord);
router.delete("/words/:title", controller.deleteWord);

export default router;
