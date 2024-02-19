import React from "react";

const Perks = () => {
  return (
    <>
      <h1 className="text-2xl">Perks</h1>
      <p className="text-sm text-gray-400">
        Select all the perks of your place
      </p>

      <div className="flex flex-wrap">
        <label className="flex gap-2 py-2 px-4 m-1 border rounded-lg border-gray-300 cursor-pointer text-md">
          <input type="checkbox" />
          <span className="flex items-center gap-2">
            <i className="fa-solid fa-wifi"></i>Wifi
          </span>
        </label>
        <label className="flex gap-2 py-2 px-4 m-1 border rounded-lg border-gray-300 cursor-pointer text-md">
          <input type="checkbox" />
          <span className="flex items-center gap-2">
            <i className="fa-solid fa-car-side"></i>Free parking spot
          </span>
        </label>
        <label className="flex gap-2 py-2 px-4 m-1 border rounded-lg border-gray-300 cursor-pointer text-md">
          <input type="checkbox" />
          <span className="flex items-center gap-2">
            <i className="fa-solid fa-tv"></i>TV
          </span>
        </label>
        <label className="flex gap-2 py-2 px-4 m-1 border rounded-lg border-gray-300 cursor-pointer text-md">
          <input type="checkbox" />
          <span className="flex items-center gap-2">
            <i className="fa-solid fa-paw"></i>Pets
          </span>
        </label>
        <label className="flex gap-2 py-2 px-4 m-1 border rounded-lg border-gray-300 cursor-pointer text-md">
          <input type="checkbox" />
          <span className="flex items-center gap-2">
            <i className="fa-solid fa-door-open"></i>Private Entrance
          </span>
        </label>
      </div>
    </>
  );
};

export default Perks;
