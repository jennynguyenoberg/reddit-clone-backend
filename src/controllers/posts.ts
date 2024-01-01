import { Request, Response } from "express"
import Post from "../models/Post"
import { assertDefined } from "../util/asserts"

export const create = async (req: Request, res: Response) => {
  assertDefined(req.userId)
  const { title, link, body } = req.body

  const post = new Post({
    title,
    link,
    body,
    author: req.userId
  })
  
  try {
    const savePost = await post.save()
    res.status(201).json(savePost)
  } catch (error) {
      console.log(error);
      res.status(500).json({message: 'Failed to create post'})
  }
}

export const getAllPosts = async (req: Request, res: Response) => {
  const posts = await Post.find().populate('author')

  res.status(200).json(posts)
}