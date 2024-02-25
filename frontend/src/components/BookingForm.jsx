import React, { useContext, useEffect, useState } from "react";
import { differenceInCalendarDays } from "date-fns";
import { UserContext } from "@/context/UserContext";
import axios from "axios";
import { Navigate } from "react-router-dom";

const BookingForm = ({ place }) => {
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [numberOfGuests, setNumberOfGuests] = useState(1);
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [redirect, setRedirect] = useState("");
  const { user } = useContext(UserContext);

  useEffect(() => {
    if (user) {
      setName(user.fullName);
    }
  }, []);
  

  let numberOfNights = 0;
  if (checkIn && checkOut) {
    numberOfNights = differenceInCalendarDays(
      new Date(checkOut),
      new Date(checkIn)
    );
  }

  const submitHandler = async (e) => {
    e.preventDefault();
    const res = await axios.post("/booking", {
      checkIn,
      checkOut,
      numberOfGuests,
      name,
      phone: mobile,
      place: place._id,
      price: numberOfNights * place.price,
    });
    const bookingId = await res.data._id;
    setRedirect('/account/bookings/'+bookingId);
  };

  if(redirect){
    return <Navigate to={redirect}/>
  }

  return (
    <>
      <div className="border border-gray-100 p-4 w-fit h-fit flex items-center flex-col gap-4 bg-white rounded-2xl shadow-lg shadow-gray-300">
        <h1 className="text-lg font-bold">Price: ₹{place.price}/per night</h1>
        <form className=" flex flex-col gap-4 p-2" onSubmit={submitHandler}>
          <div className="flex gap-2 justify-center">
            <div className="flex flex-col">
              <label>Check in:</label>
              <input
                type="date"
                className=" bg-transparent border rounded-lg text-sm p-1 mt-1"
                value={checkIn}
                onChange={(e) => setCheckIn(e.target.value)}
              />
            </div>
            <div className="flex flex-col">
              <label>Check Out:</label>
              <input
                type="date"
                className=" bg-transparent border rounded-lg text-sm p-1 mt-1"
                value={checkOut}
                onChange={(e) => setCheckOut(e.target.value)}
              />
            </div>
          </div>
          <div className="flex flex-col">
            <label>Number of guests</label>
            <input
              type="number"
              placeholder="1"
              className=" bg-transparent border rounded-lg text-sm p-1 mt-1"
              value={numberOfGuests}
              onChange={(e) => setNumberOfGuests(e.target.value)}
            />
          </div>
          {numberOfNights > 0 && (
            <>
              <div className="flex flex-col">
                <label>Name</label>
                <input
                  type="text"
                  className=" bg-transparent border rounded-lg text-sm p-1 mt-1"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="flex flex-col">
                <label>Mobile no.</label>
                <input
                  type="tel"
                  className=" bg-transparent border rounded-lg text-sm p-1 mt-1"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                />
              </div>
            </>
          )}
          {user && (
            <button
              type="submit"
              className="px-4 py-2 bg-primary rounded-2xl text-white"
            >
              Book
              {numberOfNights > 0 && (
                <span> ₹{numberOfNights * place.price}</span>
              )}
            </button>
          )}
          {!user && (
            <button className="px-4 py-2 bg-primary rounded-2xl text-white">
              Login to continue
            </button>
          )}
        </form>
      </div>
    </>
  );
};

export default BookingForm;
