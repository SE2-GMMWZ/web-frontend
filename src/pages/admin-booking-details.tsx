import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { CalendarDays } from "lucide-react";

type BookingData = {
  id: string;
  name: string;
  location: string;
  contactInfo: string;
  properties: string[];
  dateStart: string;
  dateEnd: string;
};

const dummyBooking: BookingData = {
  id: "1",
  name: "Dock A",
  location: "Harbor Street 42",
  contactInfo: "owner@example.com",
  properties: [
    "WiFi",
    "Shower",
    "Breakfast included",
    "Electricity",
    "Water supply",
  ],
  dateStart: "2022-01-01",
  dateEnd: "2022-01-02",
};

const BookingDetails: React.FC = () => {
  const { bookingId } = useParams();
  const navigate = useNavigate();

  const [booking, setBooking] = useState<BookingData | null>(null);
  const [checked, setChecked] = useState<boolean[]>([]);

  useEffect(() => {
    if (bookingId === "1" || bookingId === "2") {
      setBooking(dummyBooking);
      setChecked(Array(dummyBooking.properties.length * 2).fill(true));
    } else {
      setBooking(null);
    }
  }, [bookingId]);

  const handleCheckboxChange = (index: number) => {
    const updated = [...checked];
    updated[index] = !updated[index];
    setChecked(updated);
  };

  if (!booking) return <p className="p-6">Booking not found</p>;

  return (
    <div className="p-6 flex flex-col gap-6">
      <div className="flex items-center gap-4">
        <ArrowLeft className="cursor-pointer" onClick={() => navigate(-1)} />
        <h1 className="text-3xl font-semibold">Booking Details</h1>
      </div>
      <div className="grid grid-cols-2 gap-8">
        <div className="flex flex-col gap-4">
          <div>
            <label className="block mb-1 font-medium">Dock Name:</label>
            <input
              type="text"
              value={booking.name}
              className="border px-4 py-2 rounded w-full"
              readOnly
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Location:</label>
            <input
              type="text"
              value={booking.location}
              className="border px-4 py-2 rounded w-full"
              readOnly
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">
              Contact information:
            </label>
            <input
              type="text"
              value={booking.contactInfo}
              className="border px-4 py-2 rounded w-full"
              readOnly
            />
          </div>
          <div>
            <label className="block mb-2 font-medium">Properties:</label>
            <div className="grid grid-cols-2 gap-4 bg-purple-100 p-4 rounded">
              {[0, 1].map((col) => (
                <div key={col} className="flex flex-col gap-2">
                  {booking.properties.map((prop, idx) => (
                    <label key={idx} className="flex items-center gap-2">
                      <span>{prop}</span>
                      <input
                        type="checkbox"
                        checked={checked[col * booking.properties.length + idx]}
                        onChange={() =>
                          handleCheckboxChange(
                            col * booking.properties.length + idx,
                          )
                        }
                      />
                    </label>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-4">
            <label className="text-lg font-medium min-w-[140px]">
              Date of reservation
            </label>
            <div className="relative">
              <span className="absolute text-xs left-2 top-[-10px] bg-white px-1">
                From
              </span>
              <input
                type="date"
                value={booking.dateStart}
                className="border rounded px-4 py-2 pr-10"
              />
              <CalendarDays className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
            </div>
            <div className="relative">
              <span className="absolute text-xs left-2 top-[-10px] bg-white px-1">
                To
              </span>
              <input
                type="date"
                value={booking.dateEnd}
                className="border rounded px-4 py-2 pr-10"
              />
              <CalendarDays className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
            </div>
          </div>
        </div>
      </div>
      <div className="flex gap-4 mt-4">
        <button className="bg-black text-white px-4 py-2 rounded">
          Delete Booking
        </button>
        <button className="border px-4 py-2 rounded">Edit Booking</button>
        <button className="bg-gray-200 px-4 py-2 rounded">Save changes</button>
      </div>
    </div>
  );
};

export default BookingDetails;
