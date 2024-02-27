import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
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
      const { data } = await axios.get("/user-places");
      // console.log(data);
      setPlaces(data);
    }

    getData();
  }, [action,places]);
  // console.log(places);

  const deletePlace = async (e,placeId)=>{
    e.preventDefault();
    // console.log(placeId.placeId);
    await axios.delete(`/places/${placeId.placeId}`);
    // console.log(res);
    setPlaces([]);
  }

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
                  className=" rounded-xl mx-12 flex p-1 gap-2 relative"
                >
                  <div className="flex w-32 h-32 shrink-0">
                    <img
                      src={"http://localhost:4000" + place.photos[0]}
                      alt=""
                      className="object-cover rounded-lg"
                    />
                  </div>
                  <div className="grow-0 shrink">
                    <h1 className="text-2xl">{place.title}</h1>
                    <p className="text-sm mt-2 text-">{place.description}</p>
                  </div>
                  <TooltipProvider delayDuration={'50'}>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <button onClick={(e)=>deletePlace(e,{placeId:place._id})} className="absolute right-0 p-2 px-3 mx-2 bg-gray-200 rounded-full">
                          <i className="fa-solid fa-trash text-gray-800"></i>
                        </button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Remove this place</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
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
