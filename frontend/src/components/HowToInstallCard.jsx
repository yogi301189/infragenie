// src/components/HowToInstallCard.jsx

import React from "react";

const HowToInstallCard = () => {
  return (
    <div className="bg-black/40 backdrop-blur-md border border-white/10 rounded-2xl p-6 w-full max-w-4xl mx-auto shadow-lg hover:shadow-2xl transition duration-300 transform hover:-translate-y-1">
      <h2 className="text-xl font-semibold text-white mb-4">
        🛠️ How to Install
      </h2>
      <div className="flex flex-col sm:flex-row justify-around gap-4 text-sm text-blue-300 font-medium">
        <a
          href="https://kubernetes.io/docs/setup/"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-blue-500 transition"
        >
          🧩 Kubernetes
        </a>
        <a
          href="https://developer.hashicorp.com/terraform/downloads"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-blue-500 transition"
        >
          🔧 Terraform
        </a>
        <a
          href="https://docs.docker.com/get-docker/"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-blue-500 transition"
        >
          🐳 Docker
        </a>
      </div>
    </div>
  );
};

export default HowToInstallCard;
