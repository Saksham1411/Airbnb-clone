import Bookings from "@/components/booking/Bookings";
import Places from "@/components/places/Places";
import { UserContext } from "@/context/UserContext";
import React, { useContext } from "react";
import { Link, Navigate, useParams } from "react-router-dom";

const AccountPage = () => {
  const { user } = useContext(UserContext);
  // console.log(user);
  if (!user) {
    return <Navigate to={"/"} />;
  }

  let { subpage } = useParams();
  if (subpage === undefined) {
    subpage = "profile";
  }

  function linkClasses(page) {
    let classs = "py-2 px-4 rounded-full";
    if (page === subpage) {
      classs += " rounded-full bg-primary text-white";
    }
    return classs;
  }

  return (
    <div>
      <nav className="flex gap-4 justify-center m-4">
        <Link className={linkClasses("profile")} to={"/account"}>
          My Profile
        </Link>
        <Link className={linkClasses("bookings")} to={"/account/bookings"}>
          My Booking
        </Link>
        <Link className={linkClasses("places")} to={"/account/places"}>
          My Accommodations
        </Link>
      </nav>
      {subpage === "profile" && (
        <div className="flex flex-col items-center gap-4">
          <div className="text-2xl font-bold">Account details</div>
          <div className="text-lg">
            <div>Email: {user.email}</div>
            <div>Name: {user.fullName}</div>
          </div>
        </div>
      )}
      {subpage === "places" && <Places/>}
      {subpage === "bookings" && <Bookings/>}
    </div>
  );
};

export default AccountPage;
