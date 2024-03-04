import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { differenceInCalendarDays, format } from "date-fns";
import Booking from "./Booking";

const Bookings = () => {
  const [bookings, setBookings] = useState([]);
  useEffect(() => {
    const getBookings = async () => {
      const { data } = await axios.get("/booking");
      setBookings(data);
    };

    getBookings();
  }, []);
  const { action } = useParams();
  console.log("actions", action);
  return (
    <>
      {action === undefined && (
        <div className="flex flex-col gap-4 items-center my-12">
          {bookings.length > 0 &&
            bookings.map((booking) => (
              <Link
                to={"/account/bookings/" + booking._id}
                className="border border-gray-200 max-w-fit p-4 flex gap-2 shadow-md"
              >
                <div className="h-fit w-40">
                  <img
                    src={booking.place.photos[0]}
                    alt=""
                    className=" object-cover rounded-xl"
                  />
                </div>
                <div>
                  <h1 className="font-semibold text-lg">
                    {booking.place.title}
                  </h1>
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
                  <div className="font-semibold">
                    <i className="fa-regular fa-credit-card mr-2"></i>
                    Total Price: ₹{booking.price}
                  </div>
                </div>
              </Link>
            ))}
        </div>
      )}
      {action != undefined && <Booking />}
    </>
  );
};

export default Bookings;
