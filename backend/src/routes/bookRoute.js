import express from "express";
import { Book } from "../models/bookModel.js";
import { handlsResError } from "../utils/ResError.js";

const router = express.Router();

// Route to save a book
router.post("/", async (req, res) => {
  try {
    const { title, author, publishYear } = req.body;
    if (!title || !author || !publishYear)
      return res.status(400).send({ message: "Send all required fields" });
    const newBook = { title, author, publishYear };
    const book = await Book.create(newBook);
    return res.status(201).send(book);
  } catch (error) {
    console.log(error);
    return handlsResError(res, 500, "Internal Server Error");
  }
});

// Route to get all book
router.get("/", async (req, res) => {
  try {
    const book = await Book.find({});
    return res.status(200).json({
      count: book.length,
      data: book,
    });
  } catch (error) {
    console.log(error);
    return handlsResError(res, 500, error.message);
  }
});

// Route to get a book
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findById(id);
    return res.status(200).json(book);
  } catch (error) {
    console.log(error);
    return handlsResError(res, 500, error.message);
  }
});

// Route to update a book
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { title, author, publishYear } = req.body;
    if (!title || !author || !publishYear)
      return res.status(400).send({ message: "Send all required fields" });
    const updatedBook = { title, author, publishYear };
    const result = await Book.findByIdAndUpdate(id, updatedBook, { new: true });
    if (!result) return res.status(404).send({ message: "Book not found" });
    return res
      .status(200)
      .send({ message: "Book updated successfully", book: result });
  } catch (error) {
    console.log(error);
    return handlsResError(res, 500, error.message);
  }
});

// Route to delete a book
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findByIdAndDelete(id);
    if (!book) return res.status(404).send({ message: "Book not found" });
    return res.status(200).send({ message: "Book deleted successfully" });
  } catch (error) {
    console.log(error);
    return handlsResError(res, 500, error.message);
  }
});

export default router;
