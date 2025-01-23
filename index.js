const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());
const PORT = 3001;

app.get("/auth/hello", (_req, res) => {
  res.send("<h1>Hello Demacia</h1>");
});
app.listen(PORT, (error) => {
  if (error) {
    console.log(error);
    return;
  }
  console.log(`Server running at http://localhost:${PORT}`);
});
