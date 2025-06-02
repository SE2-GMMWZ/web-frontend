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
          images: [],
          is_approved: false,
          publication_date: new Date().toISOString(),
          location: "",
          links: [],
        }),
      });

      if (!res.ok) throw new Error("Failed to add guide");

      navigate("/editor");
    } catch (err: any) {
      setError(err.message || "Something went wrong.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <EditorNavbar />
      <div className="flex-1 flex flex-col justify-center items-center px-4 py-12">
        <div className="w-full max-w-2xl">
          <h1 className="text-5xl md:text-4xl font-semibold mb-10 text-center">
            Create a New Guide
          </h1>

          {error && <p className="text-red-500 mb-6 text-center">{error}</p>}

          <label className="block text-xl mb-2">Title</label>
          <input
            type="text"
            className="w-full border border-black px-6 py-3 rounded-xl text-lg mb-6 focus:outline-none focus:ring-2 focus:ring-black"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <label className="block text-xl mb-2">Content</label>
          <textarea
            className="w-full border border-black px-6 py-3 rounded-xl text-lg h-48 mb-8 resize-none focus:outline-none focus:ring-2 focus:ring-black"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />

          <div className="flex gap-4 justify-center">
            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="bg-black text-white px-6 py-3 rounded-xl hover:bg-gray-800 transition disabled:opacity-50"
            >
              {isSubmitting ? "Submitting..." : "Submit Guide"}
            </button>
            <button
              onClick={() => navigate("/editor")}
              className="bg-gray-200 hover:bg-gray-300 px-6 py-3 rounded-xl"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
