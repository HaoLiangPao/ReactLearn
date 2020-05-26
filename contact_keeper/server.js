const express = require("express");
const connectDB = require("./config/db");

const app = express();

// Connect Database
connectDB();

// Init Middleware: parse data passed in body
app.use(express.json({ extended: false }));

// Default Route
app.get("/", (req, res) =>
  res.json({ msg: "Welcome tho the ContactKeeper API ..." })
);
// Define Routes
app.use("/api/users", require("./routes/users"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/contacts", require("./routes/contacts"));

// Specify the port used in the development environment
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}...`));
