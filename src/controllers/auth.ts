import { Request, Response } from "express";
import User from "../models/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
// import { assertDefined } from "../util/asserts";

export const register = async (req: Request, res: Response) => {
  const {username, password} = req.body;

  try {
      if (await User.findOne({userName: username})) {
          return res.status(400).json({ message: 'Username taken'})
      }

      const user = new User({ userName: username, password })
      await user.save()
      
      res.status(201).json({ username, id: user._id });

  } catch (error) {
      console.log(error)
      res.status(500).json('Internal Server Error');
  }
}

export const logIn = async (req: Request, res: Response) => {
  try {
      const { username, password } = req.body;

      const user = await User.findOne({userName: username}, '+password')

      if (!user || !await bcrypt.compare(password, user.password))  {
          return res.status(400).json({ message: 'Wrong username or password' })
      }

      const secret = process.env.JWT_SECRET;
      if (!secret) {
          throw Error('Missing JWT_SECRET')
      }

      const token = jwt.sign({ userId: user._id }, secret, { expiresIn: '1h'})

      res.status(200).json({token, username: user.userName})

  } catch (error) {
      res.status(500).json({
          message: 'Something went wrong'
      })
  }
}

export const profile = async (req: Request, res: Response) => {
  const { userId } = req 

  const user = await User.findById(userId);

  if (!user) {
      console.log('User not found with id: ', userId)
      return res.status(404).json({ message: 'User not found'})
  }

  res.status(200).json({
      userName: user.userName
  })
}

// export const logIn = async (req: Request, res: Response) => {
//   try {
//       const { username, password } = req.body;

//       const user = await User.findOne({userName: username}, '+password')

//       if (!user || !await bcrypt.compare(password, user.password))  {
//           return res.status(400).json({ message: 'Wrong username or password' })
//       }

//       const secret = process.env.JWT_SECRET;
//       if (!secret) {
//           throw Error('Missing JWT_SECRET')
//       }

//       const token = jwt.sign({ userId: user._id }, secret, { expiresIn: '1h'})

//       res.status(200).json({token, username: user.userName})

//   } catch (error) {
//       res.status(500).json({
//           message: 'Something went wrong'
//       })
//   }
// }

// export const refreshJWT = async (req: Request, res: Response) => {
//   const { refreshToken } = req.body;

//   const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET;
//   if (!refreshTokenSecret) {
//     throw Error("Missing REFRESH_TOKEN_SECRET");
//   }

//   try {
//     const decodedPayload = (await jwt.verify(
//       refreshToken,
//       refreshTokenSecret,
//     )) as { userId: string };

//     assertDefined(process.env.JWT_SECRET);

//     // Returnera JWT
//     const token = jwt.sign(
//       { userId: decodedPayload.userId },
//       process.env.JWT_SECRET,
//       { expiresIn: "1h" },
//     );

//     return res.status(200).json({ token });
//   } catch (error) {
//     console.log(error);

//     return res.status(403).json({ message: "Invalid token" });
//   }
// };

// export const profile = async (req: Request, res: Response) => {
//   const { userId } = req;

//   const user = await User.findById(userId);

//   if (!user) {
//     console.log("User not found with id: ", userId);
//     return res.status(404).json({ message: "User not found" });
//   }

//   res.status(200).json({
//     userName: user.userName,
//   });
// };
