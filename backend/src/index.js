import express from "express";
import mongoose from "mongoose";
import { PORT, MONGODB_URI } from "./config.js";
import bookRoute from "./routes/bookRoute.js";
import cors from "cors";

const app = express();

// app.get("/", (req, res) => {
//   res.status(234).send("<h1>hello</h1>");
// });

app.use(express.json());
// opt 1 Allow all origins with default cors()
app.use(cors());
// opt 2 Allow custom origins meanign url
// app.use(
//   cors({
//     origin: "http://localhost:5173",
//     mehtod: ["GET", "PUT", "DELETE", "POST"],
//     allowedHeaders: ["Content-Type"],
//   })
// );
app.use("/books", bookRoute);

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log("App is connected to database");
    app.listen(PORT, (req, res) => {
      console.log(`App is listening to port ${PORT}`);
    });
  })
  .catch((error) => console.log(error));
