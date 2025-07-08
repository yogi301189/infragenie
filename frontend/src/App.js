import React, { useState } from "react";
import "./App.css";

function App() {
  const [prompt, setPrompt] = useState("");
  const [type, setType] = useState("kubernetes");
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    setLoading(true);
    try {
      const response = await fetch("http://localhost:8000/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ type, prompt })
      });

      const data = await response.json();
      setCode(data.code || "Something went wrong");
    } catch (error) {
      setCode("Error: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app">
      <h1>🛠️ Infragenie</h1>
      <textarea
        placeholder="Enter your prompt (e.g., 'Create nginx deployment')"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        rows={4}
      />
      <select value={type} onChange={(e) => setType(e.target.value)}>
        <option value="kubernetes">Kubernetes</option>
        <option value="terraform">Terraform</option>
      </select>
      <button onClick={handleGenerate} disabled={loading}>
        {loading ? "Generating..." : "Generate"}
      </button>

      <pre className="output">{code}</pre>
    </div>
  );
}

export default App;
