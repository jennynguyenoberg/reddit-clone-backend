import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import * as authController from "./controllers/auth";
import * as postsController from "./controllers/posts";
import * as commentsController from "./controllers/comments";
import * as votesController from "./controllers/votes";
import validateToken from "./middleware/validateToken";

const app = express();

app.use(cors());
app.use(express.json());

app.post("/register", authController.register);
app.post("/login", authController.logIn);
app.get("/profile", validateToken, authController.profile);

app.post("/posts", validateToken, postsController.create);
app.get("/posts", postsController.getAllPosts);
app.get("/posts/:id", postsController.getPost);

app.post("/posts/:postId/upvote", validateToken, votesController.upvote);
app.post("/posts/:postId/downvote", validateToken, votesController.downvote);

app.post(
  "/posts/:postId/comments",
  validateToken,
  commentsController.createComment,
);
app.delete(
  "/posts/:postId/comments/:commentId",
  validateToken,
  commentsController.deleteComment,
);
app.delete("/posts/:postId", validateToken, postsController.deletePost);

const mongoURL = process.env.DB_URL;

if (!mongoURL) throw Error("Missing db url");

mongoose.connect(mongoURL).then(() => {
  const PORT = parseInt(process.env.PORT || "3000");

  app.listen(PORT, () => {
    console.log(`Backend listening on ${PORT}`);
  });
});
