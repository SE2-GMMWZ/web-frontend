import React from "react";

type EditorPanelCardProps = {
    id: string;
    title: string;
    subtitle: string;
    imgSrc: string;
};

const EditorPanelCard: React.FC<EditorPanelCardProps> = ({ id, title, subtitle, imgSrc }) => {
    return ( 
        <div key={id} className="border rounded p-4 flex flex-col items-start gap-2">
            <div className="w-full h-32 bg-gray-100 flex items-center justify-center rounded">
            <img src={imgSrc} alt={title} className="w-full h-full rounded-md object-cover" />
            </div>
            <h3 className="text-md font-semibold">{title}</h3>
            <p className="text-sm text-gray-600">{subtitle}</p>
        </div>
    );

}

export default EditorPanelCard;