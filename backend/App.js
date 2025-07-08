import React, { useState } from "react";
import "./App.css";

function App() {
  const [type, setType] = useState("kubernetes");
  const [prompt, setPrompt] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    setLoading(true);
    setResult("");

    try {
      const res = await fetch("http://localhost:5000/generate", {
        method: "POST", "GET"
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ type, prompt }),
      });

      const data = await res.json();
      setResult(data.code);
    } catch (err) {
      setResult("Error generating code.");
    }

    setLoading(false);
  };

  return (
    <div className="App">
      <h1>InfraGenie 🧞‍♂️</h1>
      <p>AI-powered Terraform & Kubernetes Generator</p>

      <select value={type} onChange={(e) => setType(e.target.value)}>
        <option value="kubernetes">Kubernetes YAML</option>
        <option value="terraform">Terraform Code</option>
      </select>

      <textarea
        rows="5"
        placeholder="Describe what you want to generate..."
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      />

      <button onClick={handleGenerate} disabled={loading}>
        {loading ? "Generating..." : "Generate"}
      </button>

      {result && (
        <pre>
          <code>{result}</code>
        </pre>
      )}
    </div>
  );
}

export default App;
