import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import EditorNavbar from "../components/editor/EditorNavbar.tsx";
import { useAuth } from "../providers/AuthProvider.tsx";

const API_URL = process.env.REACT_APP_API_URL;

export default function AddGuideView() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    if (!title || !content) {
      setError("Title and content are required.");
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const res = await fetch(`${API_URL}/guides`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          content,
          author_id: user?.id,
        }),
      });

      if (!res.ok) throw new Error("Failed to add guide");

      navigate("/editor"); // Redirect to panel after success
    } catch (err: any) {
      setError(err.message || "Something went wrong.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <EditorNavbar />
      <div className="p-8 max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">Create a New Guide</h1>

        {error && <p className="text-red-500 mb-4">{error}</p>}

        <label className="block mb-2 font-medium">Title</label>
        <input
          type="text"
          className="w-full border px-4 py-2 rounded mb-4"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <label className="block mb-2 font-medium">Content</label>
        <textarea
          className="w-full border px-4 py-2 rounded h-48 mb-6"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        <div className="flex gap-4">
          <button
            onClick={handleSubmit}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Submit Guide"}
          </button>
          <button
            onClick={() => navigate("/editor")}
            className="bg-gray-200 hover:bg-gray-300 px-6 py-2 rounded"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
