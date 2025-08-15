const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 5000;
//second test commnent
app.use(cors());
app.use(express.json());

let feedbackList = [];
let idCounter = 1;

// Get all feedback
app.get("/api/feedback", (req, res) => {
  res.json(feedbackList);
});

// Add feedback
app.post("/api/feedback", (req, res) => {
  const { name, message } = req.body;
  if (!name || !message) {
    return res.status(400).json({ error: "Name and message are required" });
  }
  const newFeedback = { id: idCounter++, name, message };
  feedbackList.push(newFeedback);
  res.status(201).json(newFeedback);
});

// Delete feedback
app.delete("/api/feedback/:id", (req, res) => {
  const id = parseInt(req.params.id);
  feedbackList = feedbackList.filter(fb => fb.id !== id);
  res.json({ message: "Feedback deleted" });
});

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
