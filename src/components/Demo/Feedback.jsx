import React, { useState } from "react";
import "./Feedback.css"; // You can create this CSS file for custom styling

export default function Feedback() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    // You can handle the form submission here, e.g., send data to a server
    console.log({ name, email, message });
    setSubmitted(true);
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <h2 className="text-4xl my-20">Feedback</h2>

      <div className="feedback-container bg-zinc-800 text-white w-2/3">
        {submitted ? (
          <div className="feedback-thank-you">
            <p className="text-white">Thank you for your feedback!</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="feedback-form">
            <div className="form-group">
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                id="name"
                className="bg-zinc-900 border border-gray-700 "
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                className="bg-zinc-900 border border-gray-700"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="message">Message:</label>
              <textarea
                id="message"
                className="bg-zinc-900 border border-gray-700"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows="4"
                required
              />
            </div>
            <button type="submit">Submit Feedback</button>
          </form>
        )}
      </div>
    </div>
  );
}
