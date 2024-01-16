import {Router} from "express";
import bcrypt from "bcrypt";
import {PrismaClient} from "@prisma/client";
import jwt from "jsonwebtoken";
const router = Router();
const prisma = new PrismaClient();

router.post("/login", (req, res) => {
  res.send("Login");
});

router.post("/register", async (req, res) => {
  try {
    const {username, password} = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: {
        username,
        password: hashedPassword,
      },
    });

    res.status(201).json({message: "User registered successfully"});
  } catch (error) {
    res.status(500).json({error: "Registration failed", message: error});
  }
});

router.post("/login", async (req, res) => {
  try {
    const {username, password} = req.body;
    const user = await prisma.user.findUnique({
      where: {
        username,
      },
    });
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({error: "Incorrect password"});
    }
    const token = jwt.sign({userId: user.username}, process.env.SECRET_KEY, {
      expiresIn: "3h",
    });
    res.status(200).json({token});
  } catch (error) {
    res.status(500).json({error: "Login failed"});
  }
});

export default router;
