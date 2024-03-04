import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const IndexPage = () => {
  const [places, setPlaces] = useState([]);
  useEffect(() => {
    const getAllPlaces = async () => {
      const res = await axios.get("/places");
      const data = await res.data.places;
      setPlaces(data);
      console.log(data);
    };
    getAllPlaces();
  }, []);

  return <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-4 mx-8 gap-1">
  {places.length > 0 && places.map((place) => 
    <Link to={'/places/'+place._id} className=" rounded-xl p-4 cursor-pointer">
      <div className="flex mb-2">
        <img src={place.photos[0]} className="rounded-xl object-cover aspect-square"/>
      </div>
      <div className="font-bold">{place.address}</div>
      <div className="text-sm text-gray-500">{place.title}</div>
      <div className="mt-2"><span className=" font-semibold" >₹{place.price}</span> /per night</div>
    </Link>
  )}
  </div>
}

export default IndexPage;
