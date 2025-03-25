import React from "react";
import EditorNavbar from "../components/editor/EditorNavbar.tsx";
import EditorPanelCard from "../components/editor/panel/EditorPanelCard.tsx";
import EditorFooter from "../components/editor/EditorFooter.tsx";

const guides = [
    {
        id: '1',
        title: 'Śniardwy Lake',
        subtitle: 'How not to get lost on the biggest lake in Poland?',
        imgSrc: 'https://backend.triverna.pl/blog/wp-content/uploads/2023/12/Widok-z-lotu-ptaka-na-piekne-polskie-jezioro-1536x1023.jpeg',
    },
    {
        id: '2',
        title: 'Boat rental',
        subtitle: 'Organizing your first very own trip? Check how not to get scammed',
        imgSrc: 'https://wodnesprawy.pl/wp-content/uploads/2023/08/Wodne-Sprawy-17_2023-15.jpg',
    },
    {
        id: '3',
        title: 'Looking for ports?',
        subtitle: 'Let us show you how to use our app to effectively find dock of your dreams!',
        imgSrc: 'https://content.skyscnr.com/m/11beffac00dd6211/original/rajgrod-lake-suwalszczyzna-east-poland.jpg?resize=1800px:1800px&quality=100',
    },
    {
        id: '4',
        title: 'New to Mazury Lakes?',
        subtitle: 'In this guide we will advise you which lakes are best to explore being a beginner',
        imgSrc: 'https://images.immediate.co.uk/production/volatile/sites/63/2024/08/f5f4589e8fea4b993563e8b00407b9151be9a612-6574ae3.jpeg?quality=90&resize=980,654',
    },
    {
        id: '5',
        title: 'Port maneuvres',
        subtitle: 'Did you know that while docking you can use the wind so that it helps you?',
        imgSrc: 'https://api.kopalnia.pl/storage/2020/3/kopalnia-wiedzy-najpiekniejsze-jeziora-w-polsce-1-kopalnia-soli-wieliczka-700x465-05-09-2018.jpg',
    },
    {
        id: '6',
        title: 'Southern Mazury',
        subtitle: 'Where to stay in wild and what to see in the southern part of Mazury',
        imgSrc: 'https://polskazachwyca.pl/wp-content/uploads/2017/09/mazury-shutterstock_399985660.jpg',
    },
  ];

const EditorPanel: React.FC = () => {
    return (
        <div className="">
            <EditorNavbar/>
            <div className="p-8">
                <h2 className="text-xl font-semibold mb-1">Guides</h2>
                <p className="text-sm text-gray-500 mb-6">date: this month</p>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {guides.map((guide) => (
                        <EditorPanelCard key={guide.id} id={guide.id} 
                        title={guide.title} subtitle={guide.subtitle} imgSrc={guide.imgSrc} />    
                    ))}
                </div>
            </div>
            <EditorFooter/>
        </div>
    );
}

export default EditorPanel;