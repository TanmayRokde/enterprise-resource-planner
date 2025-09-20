const express = require("express");
const cors = require("cors");

const app = express();
const router = express.Router(); 


const morgan = require("morgan");

app.use(morgan("dev"));

app.use(cors());
app.use(express.json());



require("./routes/students")(router);
require("./routes/school")(router);



app.use("/api", router);

module.exports = app;
