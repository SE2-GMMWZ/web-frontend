import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, CalendarDays } from 'lucide-react';

type GuideData = {
  id: string;
  author: string;
  place: string;
  contactInfo: string;
  dateStart: string;
  dateEnd: string;
  reports: string[];
};

const dummyGuide: GuideData = {
  id: '1',
  author: 'John Doe',
  place: 'Mountainside Retreat',
  contactInfo: 'johndoe@example.com',
  dateStart: '2024-11-30',
  dateEnd: '2024-11-30',
  reports: ['Reported problem [description]', 'Reported problem [description]', 'Reported problem [description]'],
};

const GuideDetails: React.FC = () => {
  const { guideId } = useParams();
  const navigate = useNavigate();

  const [guide, setGuide] = useState<GuideData | null>(null);

  useEffect(() => {
    if (guideId === '1') {
      setGuide(dummyGuide);
    } else {
      setGuide(null);
    }
  }, [guideId]);

  if (!guide) return <p className="p-6">Guide not found</p>;

  return (
    <div className="p-6 flex flex-col gap-6 max-w-xl mx-auto">
      <div className="flex items-center gap-4">
        <ArrowLeft className="cursor-pointer" onClick={() => navigate(-1)} />
        <h1 className="text-3xl font-bold text-center w-full">Guide Details</h1>
      </div>

      <div className="flex flex-col gap-4">
        <div>
          <label className="block font-medium">Author:</label>
          <input type="text" value={guide.author} readOnly className="border px-4 py-2 rounded w-full" />
        </div>
        <div>
          <label className="block font-medium">Place:</label>
          <input type="text" value={guide.place} readOnly className="border px-4 py-2 rounded w-full" />
        </div>
        <div>
          <label className="block font-medium">Contact information:</label>
          <input type="text" value={guide.contactInfo} readOnly className="border px-4 py-2 rounded w-full" />
        </div>
        <div>
          <label className="block font-medium mb-1">Posted date</label>
          <div className="flex gap-4 pt-2">
            <div className="relative w-full">
              <span className="absolute text-xs left-2 top-[-10px] bg-white px-1">From</span>
              <input type="date" value={guide.dateStart} readOnly className="border px-4 py-2 pr-10 rounded w-full" />
              <CalendarDays className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
            </div>
            <div className="relative w-full">
              <span className="absolute text-xs left-2 top-[-10px] bg-white px-1">To</span>
              <input type="date" value={guide.dateEnd} readOnly className="border px-4 py-2 pr-10 rounded w-full" />
              <CalendarDays className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-2 mt-2">
          {guide.reports.map((report, idx) => (
            <div key={idx} className="bg-gray-300 rounded p-4 text-sm">
              {report}
            </div>
          ))}
        </div>
        <div className="flex justify-between mt-4">
          <button className="bg-black text-white px-4 py-2 rounded">Delete booking</button>
          <button className="border px-4 py-2 rounded">Edit booking</button>
          <button className="bg-gray-200 px-4 py-2 rounded">Save changes</button>
        </div>
      </div>
    </div>
  );
};

export default GuideDetails;
