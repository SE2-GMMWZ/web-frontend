import React from "react";
import { GuideData } from "../../../types/guide";

type EditorPanelCardProps = {
  guide: GuideData;
  onView: (item: GuideData) => void;
  onDelete: (item: GuideData) => void;
};

const EditorPanelCard: React.FC<EditorPanelCardProps> = ( { guide, onView, onDelete} : EditorPanelCardProps) => {
    return ( 
        <div key={guide.guide_id} className="border rounded p-4 flex flex-col items-start gap-2">
            <h3 className="text-md font-semibold">{guide.title}</h3>
            <p className="text-sm text-gray-600">{guide.content}</p>
        </div>
    );

}

export default EditorPanelCard;