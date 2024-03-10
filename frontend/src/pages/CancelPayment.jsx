import React from "react";
import { Link } from "react-router-dom";
const CancelPayment = () => {
  return (
    <div className="flex flex-col gap-4 justify-center items-center h-[80vh]">
      <div className="font-bold text-4xl text-red-600">
        Your payment is canceled
        <i className="fa-solid fa-circle-xmark ml-2"></i>
      </div>
      <Link to="/" className="uppercase font-semibold border text-white bg-primary px-4 py-2 rounded-2xl">home page</Link>
    </div>
  );
};

export default CancelPayment;
