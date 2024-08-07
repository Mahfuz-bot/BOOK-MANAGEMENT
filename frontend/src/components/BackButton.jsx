import React from "react";
import { Link } from "react-router-dom";
import { BsArrowLeft } from "react-icons/bs";

const BackButton = ({ destination = "/" }) => {
  return (
    <div className="flex items-center">
      <Link
        to={destination}
        className="bg-sky-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-sky-700"
      >
        <BsArrowLeft className="text-2xl" />
        <span className="text-lg">Back</span>
      </Link>
    </div>
  );
};

export default BackButton;
