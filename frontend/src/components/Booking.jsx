import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { differenceInCalendarDays, format } from "date-fns";
import ImageShowcase from "./ImageShowcase";

const Booking = () => {
  const [booking, setBookings] = useState(null);
  const [loading, setLoading] = useState(false);
  const { action } = useParams();
  useEffect(() => {
    const getBooking = async () => {
      setLoading(true);
      console.log("gggg");
      const { data } = await axios.get("/booking/" + action);
      setBookings(data);
      console.log(booking);
      setLoading(false);
    };
    getBooking();
  }, []);
  return (
    <>
      {booking && (
        <div className="my-4 px-8 pt-8 flex flex-col gap-2 m-auto w-fit">
          <h1 className="text-3xl">{booking.place.title}</h1>
          <a
            className="my-2 block font-semibold underline"
            target="_blank"
            href={`https://maps.google.com/?q=` + booking.place.address}
          >
            <i class="fa-solid fa-location-dot mr-2"></i>{" "}
            {booking.place?.address}
          </a>
          <div className="flex justify-between bg-gray-300 p-4 rounded-lg">
            <div className="flex flex-col">
              <p className="text-lg font-semibold">Your Booking information:</p>
              <div className=" text-sm my-2 text-gray-800">
                <i className="fa-regular fa-moon mx-1"></i>
                {differenceInCalendarDays(
                  new Date(booking.checkOut),
                  new Date(booking.checkIn)
                )}
                nights:
                <i class="fa-regular fa-calendar-days mx-1"></i>
                {format(new Date(booking.checkIn), "dd-MM-yy")}
                <i class="fa-solid fa-arrow-right mx-1"></i>
                <i class="fa-regular fa-calendar-days mx-1"></i>
                {format(new Date(booking.checkOut), "dd-MM-yy")}
              </div>
            </div>
            <div className="bg-primary text-white p-2 rounded-lg">
              Total price
              <br />
              <span className="text-xl font-semibold"> ₹{booking.price}</span>
            </div>
          </div>
          <ImageShowcase place={booking.place}></ImageShowcase>
        </div>

      )}
    </>
  );
};

export default Booking;
