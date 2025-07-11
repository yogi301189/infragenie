import React, { useState } from "react";
import { Button } from "./components/ui/button";
import { Textarea } from "./components/ui/textarea";
import { Copy, Loader2 } from "lucide-react";

export default function PromptForm() {
  const [prompt, setPrompt] = useState("");
  const [type, setType] = useState("kubernetes");
  const [activeTab, setActiveTab] = useState("command");
  const [code, setCode] = useState("");
  const [explanation, setExplanation] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!prompt.trim()) return;
    setLoading(true);
    setCode("");
    setExplanation("");
    setActiveTab("command");
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/generate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt, type }),
      });

      const data = await res.json();
      setCode(data.code || "No command generated.");
      setExplanation(data.explanation || "No explanation available.");
    } catch (error) {
      setCode("Error generating response. Please try again.");
      setExplanation("");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(
      activeTab === "command" ? code : explanation
    );
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="min-h-[calc(100vh-100px)] flex flex-col justify-center items-center px-4">
      <form onSubmit={handleSubmit} className="space-y-6">
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="bg-slate-800 text-white border border-slate-600 p-2 rounded w-full"
        >
          <option value="kubernetes">Kubernetes</option>
          <option value="terraform">Terraform</option>
        </select>

        <Textarea
          rows={4}
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="e.g., Create a Kubernetes Deployment for nginx"
          className="bg-slate-800 text-white border border-slate-600"
        />

        <Button
          type="submit"
          disabled={loading}
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white"
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <Loader2 className="h-4 w-4 animate-spin" /> Generating...
            </span>
          ) : (
            "Generate"
          )}
        </Button>
      </form>

      {(code || explanation) && (
  <div className="mt-10">
    <div className="bg-[#0f0f1a] border border-slate-700 rounded-xl shadow-xl p-5">
      <div className="flex items-center gap-3 mb-4">
        <img
          src={
            type === "kubernetes"
              ? "/icons/k8s.svg"
              : type === "terraform"
              ? "/icons/terraform-icon.svg"
              : "/icons/aws-icon.svg"
          }
          alt={type}
          className="h-6 w-6"
        />
        <p className="text-white font-medium">{prompt}</p>
      </div>

      <div className="flex gap-6 text-sm border-b border-slate-700 pb-2 mb-4">
        <button
          onClick={() => setActiveTab("command")}
          className={`${
            activeTab === "command"
              ? "text-indigo-400 border-b-2 border-indigo-400"
              : "text-slate-400"
          } font-medium`}
        >
          Command
        </button>
        <button
          onClick={() => setActiveTab("explanation")}
          className={`${
            activeTab === "explanation"
              ? "text-indigo-400 border-b-2 border-indigo-400"
              : "text-slate-400"
          } font-medium`}
        >
          Explanation
        </button>
      </div>

      <div className="relative bg-[#161622] text-slate-300 text-sm font-mono p-4 rounded-md">
        <pre className="whitespace-pre-wrap">{activeTab === "command" ? code : explanation}</pre>
        <button
          onClick={handleCopy}
          className="absolute top-3 right-3 text-slate-400 hover:text-white"
        >
          <Copy size={16} />
        </button>
        {copied && (
          <span className="absolute top-3 right-12 text-xs text-green-400">
            Copied!
          </span>
        )}
      </div>
    </div>
  </div>
  )} {/* ✅ this is the closing parenthesis that was likely missing */}
    </div> // ✅ closing the topmost <div>
  );
}
