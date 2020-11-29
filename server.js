const { response } = require("express");
const express = require("express");
const connectDB = require("./config/db");
const path = require("path");

const app = express();
//Connect database
connectDB();

//Init Middleware - enable to accept data (body data)
app.use(express.json({ extended: false }));

app.get("/", (req, res) =>
  res.send({ msg: "Wellcome to the ContactKeeper API" })
);

//Define Routes
app.use("/api/users", require("./routes/users"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/contacts", require("./routes/contacts"));

//Serve statucs assets in production
if (process.env.NODE_END === "production") {
  //set static folder
  app.use(express.static("client/build"));

  app.get("*", (req, res) =>
    response.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
  );
}
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`server started on port ${PORT}`));
