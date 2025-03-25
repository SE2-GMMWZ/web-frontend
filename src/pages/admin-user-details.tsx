import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, CalendarDays } from 'lucide-react';

type UserData = {
  id: string;
  name: string;
  surname: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  totalBookings: number;
};

const dummyUser: UserData = {
  id: '1',
  name: 'Tony',
  surname: 'Stark',
  email: 'tony@starkindustries.com',
  phone: '123456789',
  dateOfBirth: '29/05/1970',
  totalBookings: 42,
};

const UserDetails: React.FC = () => {
  const { userId } = useParams();
  const navigate = useNavigate();

  const [user, setUser] = useState<UserData | null>(null);

  useEffect(() => {
    if (userId === '1' || userId === '2') {
      setUser(dummyUser);
    } else {
      setUser(null);
    }
  }, [userId]);

  if (!user) return <p className="p-6">User not found</p>;

  return (
    <div className="p-6 flex flex-col gap-6">
      <div className="flex items-center gap-4">
        <ArrowLeft className="cursor-pointer" onClick={() => navigate(-1)} />
        <h1 className="text-4xl font-semibold">User Details</h1>
      </div>

      <div className="flex flex-col gap-4 max-w-md">
        <div>
          <label className="block mb-1 font-medium">Name:</label>
          <input type="text" value={user.name} readOnly className="border px-4 py-2 rounded w-full" />
        </div>
        <div>
          <label className="block mb-1 font-medium">Surname:</label>
          <input type="text" value={user.surname} readOnly className="border px-4 py-2 rounded w-full" />
        </div>
        <div>
          <label className="block mb-1 font-medium">Email:</label>
          <input type="text" value={user.email} readOnly className="border px-4 py-2 rounded w-full" />
        </div>
        <div>
          <label className="block mb-1 font-medium">Phone number:</label>
          <div className="flex gap-2">
            <span className="px-3 py-2 border rounded bg-gray-100">+48</span>
            <input type="text" value={user.phone} readOnly className="border px-4 py-2 rounded w-full" />
          </div>
        </div>
        <div>
          <label className="block mb-1 font-medium">Date of birth:</label>
          <div className="relative">
            <input type="text" value={user.dateOfBirth} readOnly className="border px-4 py-2 pr-10 rounded w-full" />
            <CalendarDays className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
          </div>
        </div>
      </div>

      <div className="mt-4 max-w-md">
        <h2 className="text-xl font-semibold mb-2">Statistics:</h2>
        <div>
          <label className="block mb-1 font-medium">Total number of bookings:</label>
          <input type="text" value={user.totalBookings.toString()} readOnly className="border px-4 py-2 rounded w-full" />
        </div>
      </div>

      <div className="flex gap-4 mt-6">
        <button className="bg-black text-white px-4 py-2 rounded">Delete User</button>
        <button className="border px-4 py-2 rounded">Edit User</button>
        <button className="bg-gray-200 px-4 py-2 rounded">Save changes</button>
      </div>
    </div>
  );
};

export default UserDetails;
