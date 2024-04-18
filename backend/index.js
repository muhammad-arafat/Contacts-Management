import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";

import { dbConnection } from "./db/dbConnection.js";

const app = express();
const port = process.env.PORT || 5000;
const __dirname = path.resolve();

dotenv.config();
app.use(express.json());
app.use(bodyParser.json());
app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
  })
);

(async () => {
  await dbConnection();

  app.get("/", (req, res) => {
    res.json({
      data: "Contact Management server hits!",
    });
  });

  app.listen(port, () => {
    console.log(`🚀 Server ready at http://localhost:${port}/`);
  });
})();
