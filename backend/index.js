import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";

import { dbConnection } from "./db/dbConnection.js";
import router from "./routes/contactInfo.route.js";

const app = express();
const port = process.env.PORT || 5000;
const __dirname = path.resolve();
dotenv.config();

(async () => {
  await dbConnection();

  app.use(express.json());
  app.use(
    cors({
      origin: ["http://localhost:5173"],
      credentials: true,
    })
  );

  app.use("/api", router);
  app.use(express.static(path.join(__dirname, "frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "frontend/dist", "index.html"));
  });
  app.get("/", (req, res) => {
    res.json({
      data: "Contact Management server hits!",
    });
  });

  app.listen(port, () => {
    console.log(`🚀 Server ready at http://localhost:${port}/`);
  });
})();
