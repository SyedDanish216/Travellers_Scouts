const express = require("express");
const Cors = require("cors");
const dotenv = require("dotenv");
const authRoute = require("./routes/auth");
const authDestination = require("./routes/destination");


//App config
const app = express();
const port = process.env.PORT || 8000;
dotenv.config();
require("./db/conn");

//Middleware
app.use(express.json());
app.use(Cors());

//APi endpoints
app.use("/api/dest", authDestination);
app.use("/api/auth", authRoute);

//Listener
app.listen(port, () => {
  console.log(`Listening to the port ${port}`);
});
