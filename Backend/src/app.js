const express = require("express");
require("./db/mongoose");
const userRouter = require("./routers/users");
const adminRouter = require("./routers/admin");
const midRouter = require("./routers/medical informations");
const authJwt = require("../middleware/jwt");
const errorHandler = require("../middleware/error-handler");
const cors = require("cors");
const morgan = require("morgan");

const app = express();
const port = process.env.PORT;

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: "GET,POST,DELETE,PUT",
    optionsSuccessStatus: 204,
  })
);

app.use(express.json());
app.use(morgan("tiny"));
app.use(authJwt());
app.use(userRouter);
app.use(adminRouter);
app.use(midRouter);
app.use(errorHandler);

app.listen(port, () => {
  console.log("Server is running on port " + port);
});
