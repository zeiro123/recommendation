import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [feedback, setFeedback] = useState([]);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  const fetchFeedback = async () => {
    const res = await fetch("http://localhost:5000/api/feedback");
    const data = await res.json();
    setFeedback(data);
  };

  useEffect(() => {
    fetchFeedback();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !message) return;

    await fetch("http://localhost:5000/api/feedback", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, message }),
    });

    setName("");
    setMessage("");
    fetchFeedback();
  };

  const handleDelete = async (id) => {
    await fetch(`http://localhost:5000/api/feedback/${id}`, {
      method: "DELETE",
    });
    fetchFeedback();
  };

  return (
    <div className="container">
      <h1>Feedback Board</h1>

      <form onSubmit={handleSubmit} className="feedback-form">
        <input
          type="text"
          placeholder="Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <textarea
          placeholder="Your Feedback"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        ></textarea>
        <button type="submit">Submit</button>
      </form>

      <div className="feedback-list">
        {feedback.map((item) => (
          <div key={item.id} className="feedback-card">
            <p><strong>{item.name}</strong></p>
            <p>{item.message}</p>
            <button onClick={() => handleDelete(item.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
