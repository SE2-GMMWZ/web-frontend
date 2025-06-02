import React from "react";
import { useNavigate } from "react-router-dom";
import EditorNavbar from "../components/editor/EditorNavbar.tsx";
import EditorPanelCard from "../components/editor/panel/EditorPanelCard.tsx";
import { useAuth } from "../providers/AuthProvider.tsx";
import useEditorGuides from "../hooks/useEditorGuides.tsx";

const EditorPanel: React.FC = () => {
    const auth = useAuth();
    const { guides, deleteGuide } = useEditorGuides(auth.user?.id || "");
    const navigate = useNavigate();
    return (
        <div className="">
            <EditorNavbar/>
            <div className="p-8">
                <h2 className="text-xl font-semibold mb-1">Guides</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {guides.map((guide) => (
                        <EditorPanelCard key={guide.guide_id} guide={guide} onView={() => navigate(`/editor/view/${guide.guide_id}`)} onDelete={() => deleteGuide(guide.guide_id)}/>    
                    ))}
                </div>
            </div>
        </div>
    );
}

export default EditorPanel;
