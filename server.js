const express = require("express");
const admin = require("./firebase"); // Import the initialized admin SDK
const bodyParser = require("body-parser");

const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json());
app.use(bodyParser.json());

// Basic route
app.get("/", (req, res) => {
  res.send("Hello, World!");
});

// Route to send a message
app.post("/send-message", async (req, res) => {
  const { token, title, body } = req.body;
  console.log(token);
  const message = {
    notification: {
      title: title,
      body: body,
    },
    token: token,
  };

  try {
    const response = await admin.messaging().send(message);
    res.status(200).send(`Message sent: ${response}`);
  } catch (error) {
    res.status(500).send(`Error sending message: ${error}`);
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
