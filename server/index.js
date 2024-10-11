require("dotenv").config();
const express = require("express");
const connectDB = require("./config/connectDB");
const cors = require('cors');
const userRouter = require("./routes/user.routes");
const oAuthRouter = require("./routes/oAuth.route");

const app = express();

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

require('./config/passport')(app);

app.get("/", (req, res) => {
  res.send({ message: "Server is running" });
});

app.use('/user', userRouter)
app.use('/auth', oAuthRouter)

const PORT = process.env.PORT || 4004;

app.listen(PORT, async () => {
  await connectDB();
  console.log(`SERVER IS UP AND RUNNING ON http://localhost:${PORT}`);
});
