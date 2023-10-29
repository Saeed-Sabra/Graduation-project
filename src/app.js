const express = require("express");
require("./db/mongoose");
const userRouter = require("./routers/users");

app = express();

const port = process.env.PORT;

app.use(express.json());
app.use(userRouter);

app.listen(port, () => {
  console.log("Server is running on port " + port);
});
