import express from "express";
import cors from "cors";

import event from "./event.js";

const PORT = process.env.PORT || 5000;
const app = express();

app.use(cors());
app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
app.use("/api/v3/app", event);

// start the Express server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
