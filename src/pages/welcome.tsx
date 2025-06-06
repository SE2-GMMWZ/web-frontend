import React from "react";
import LoginButton from "../components/LoginButton.tsx";

export default function Welcome() {
  return (
    <div>
      <div className="pt-10 h-screen flex-col flex items-center justify-center">
        <p className="text-7xl">
          Welcome to <br /> Book&Dock!
        </p>
        <div className="pt-20 flex-row flex gap-4 text-4xl">
          <LoginButton/>
        </div>
      </div>
    </div>
  );
};
