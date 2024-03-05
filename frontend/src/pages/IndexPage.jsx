import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import IndexPageSkeleton from "@/components/skeleton/IndexPageSkeleton";

const IndexPage = () => {
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(false);
  try {
    useEffect(() => {
      const getAllPlaces = async () => {
        setLoading(true);
        const res = await axios.get("/places");
        const data = await res.data.places;
        setPlaces(data);
        setLoading(false);
      };
      getAllPlaces();
    }, []);
  } catch (error) {
    toast.error(error.message);
  }
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-4 mx-8 gap-1">
      {loading && [...Array(4)].map((_, idx) => <IndexPageSkeleton/>)}
      {!loading && places.length > 0 &&
        places.map((place) => (
          <Link
            to={"/places/" + place._id}
            className=" rounded-xl p-4 cursor-pointer"
          >
            <div className="flex mb-2">
              <img
                src={place.photos[0]}
                className="rounded-xl object-cover aspect-square"
              />
            </div>
            <div className="font-bold">{place.address}</div>
            <div className="text-sm text-gray-500">{place.title}</div>
            <div className="mt-2">
              <span className=" font-semibold">₹{place.price}</span> /per night
            </div>
          </Link>
        ))}
    </div>
  );
};

export default IndexPage;
