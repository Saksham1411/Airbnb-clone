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
import toast, { Toaster } from "react-hot-toast";
import { Skeleton } from "../ui/skeleton";

const Places = () => {
  const { action } = useParams();
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(false);
  try {
    useEffect(() => {
      async function getData() {
        setLoading(true);
        const { data } = await axios.get("/user-places");
        setLoading(false);
        setPlaces(data);
      }
      getData();
    }, [action]);
  } catch (error) {
    toast.error(error.message);
  }
  const deletePlace = async (e, placeId) => {
    e.preventDefault();

    await axios.delete(`/places/${placeId.placeId}`);
    toast.success('Deleted');

    setPlaces([]);
  };

  return (
    <>
      <div><Toaster/></div>
      {loading &&  action === undefined &&
        [...Array(4)].map((_, idx) => (
          <div className="flex flex-col gap-2 mx-12 my-12">
            <div className="flex gap-4">
              <Skeleton className="h-[8.5rem] w-32" />
              <div className="flex flex-col gap-2">
                <Skeleton className="h-8 w-72 lg:w-96" />
                
                <Skeleton className="h-24 w-96 lg:w-[60rem]" />
              </div>
            </div>
          </div>
        ))}
      {!loading && action === undefined && (
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
                      src={place.photos[0]}
                      alt=""
                      className="object-cover rounded-lg"
                    />
                  </div>
                  <div className="grow-0 shrink">
                    <h1 className="text-2xl">{place.title}</h1>
                    <p className="text-sm mt-2 overflow-hidden overflow-x-hidden h-24">{place.description}</p>
                  </div>
                  <TooltipProvider delayDuration={"50"}>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <button
                          onClick={(e) =>
                            deletePlace(e, { placeId: place._id })
                          }
                          className="absolute right-0 p-2 px-3 mx-2 bg-transparent rounded-full"
                        >
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
    </>
  );
};

export default Places;
