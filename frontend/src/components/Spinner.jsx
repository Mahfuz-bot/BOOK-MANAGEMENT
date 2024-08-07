import React from "react";

const Spinner = () => {
  return (
    <>
      <div
        className="flex items-center justify-center min-h-screen
  "
      >
        <div className="animate-ping rounded-full w-16 h-8"></div>
      </div>
    </>
  );
};

export default Spinner;
