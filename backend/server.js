const express = require("express");
const cors = require("cors");
const app = express();
const port = 4000;
require("./config/dbConfig");

// Apply CORS middleware
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);

// Middleware to parse JSON requests
app.use(express.json());

const ngoRegister = require("./routes/registerAsNgo");
const donorRegistration = require("./routes/donorRoutes");

app.use("/api/", ngoRegister);
app.use("/api/", donorRegistration);

app.listen(port, () => {
  console.log(`Server running on port ${port} 🔥`);
});
