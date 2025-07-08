import React, { useState } from "react";
import "./LandingPage.css";

const LandingPage = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Replace with your Formspree endpoint
    const res = await fetch("https://formspree.io/f/YOUR_ID", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email })
    });

    if (res.ok) setSubmitted(true);
  };

  return (
    <div className="landing">
      <h1>🚀 InfraGenie</h1>
      <p>Generate Terraform and Kubernetes code with AI.</p>

      <ul className="features">
        <li>⚡ Faster infrastructure setup</li>
        <li>✅ Avoid syntax errors</li>
        <li>🤖 Built with OpenAI & Python</li>
      </ul>

      {submitted ? (
        <p className="thanks">Thank you! You're on the waitlist.</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            required
            placeholder="Your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button type="submit">Join Waitlist</button>
        </form>
      )}

      <footer>Built by Yogesh • © 2025</footer>
    </div>
  );
};

export default LandingPage;
