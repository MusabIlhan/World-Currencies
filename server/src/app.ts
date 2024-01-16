import express from "express";

import authRoutes from "./routes/auth";
import bodyParser from "body-parser";
import cors from "cors";
const app = express();
const router = express.Router();
const port = 3001;

router.use("/auth", authRoutes);

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: "GET,HEAD,PUT,PATCH,POST",
  })
);

app.use(bodyParser.json());

app.use(router);

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});
