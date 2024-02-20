import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import PlacesForm from "./PlacesForm";
import axios from "axios";
import AccountPage from "@/pages/AccountPage";
import PlacePage from "@/pages/PlacePage";

const Places = () => {

  // const param = useParams();
  const { action } = useParams();
  // console.log(param);
  const [places, setPlaces] = useState([]);
  useEffect(() => {
    async function getData() {
      const { data } = await axios.get("/places");
      // console.log(data);
      setPlaces(data);
    }

    getData();
  }, [action]);
  // console.log(places);
  return (
    <div>
      {action === undefined && (
        <>
          <div className="flex flex-col items-center justify-center gap-4">
            <Link
              className="mt-4 py-1 max-w-48 px-4 bg-primary rounded-full text-white text-center"
              to={"/account/places/new"}
            >
              Add new place
            </Link>
          </div>
          <div className="flex flex-col gap-2 mt-4">
            {places.length > 0 &&
              places.map((place) => (
                <Link
                  to={"/account/places/" + place._id}
                  className="bg-red-100 rounded-xl mx-12 flex p-1 gap-2"
                >
                  <div className="flex w-32 h-32">
                    <img
                      src={"http://localhost:4000" + place.photos[0]}
                      alt=""
                      className="object-cover rounded-lg"
                    />
                  </div>
                  <div className="grow-0 shrink">
                    <h1 className="text-2xl">{place.title}</h1>
                    <p className="text-sm mt-2">{place.description}</p>
                  </div>
                </Link>
              ))}
          </div>
        </>
      )}
      {action != undefined && <PlacesForm />}

    </div>
  );
};

export default Places;
