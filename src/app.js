const express = require("express");
require("./db/mongoose");
const userRouter = require("./routers/users");
const authJwt = require("../middleware/jwt");
const errorHandler = require("../middleware/error-handler");

const app = express();

const port = process.env.PORT;

app.use(express.json());
app.use(authJwt());
app.use(userRouter);
app.use(errorHandler);

app.listen(port, () => {
  console.log("Server is running on port " + port);
});
