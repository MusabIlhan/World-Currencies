import {Router} from "express";
import bcrypt from "bcrypt";
import {PrismaClient} from "@prisma/client";
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

export default router;
