import { Request, Response } from "express"
import User from "../models/User"

export const register = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  try {
    if (await User.findOne({ userName: username })) {
      return res.status(400).json({ message: "Username taken" });
    }

    const user = new User({ userName: username, password });
    await user.save();

    res.status(201).json({ username, id: user._id });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};