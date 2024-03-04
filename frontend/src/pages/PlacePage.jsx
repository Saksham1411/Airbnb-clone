import BookingForm from "@/components/booking/BookingForm";
import ImageShowcase from "@/components/places/ImageShowcase";
import Review from "@/components/review/Review";
import { UserContext } from "@/context/UserContext";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const PlacePage = () => {
  const { placeId } = useParams();

  const [place, setPlace] = useState(null);
  const [showAllImages, setShowAllImages] = useState(false);
  // console.log(place);

  const{user}=useContext(UserContext);
  useEffect(() => {
    const getPlace = async () => {
      if (!placeId) return;
      const { data } = await axios.get(`/places/${placeId}`);
      setPlace(data);
    };
    getPlace();
  }, [placeId]);

  if (!place) return "";

  if (showAllImages) {
    return (
      <div className="absolute inset-0 bg-black text-white h-fit">
        <div className="p-8 flex flex-col gap-2">
          <div>
            <h2 className="text-3xl">Photos of {place.title}</h2>
            <button
              onClick={() => setShowAllImages(false)}
              className="fixed right-12 top-14 bg-black p-2 rounded-xl flex gap-2 shadow-md shadow-gray-700"
            >
              {" "}
              <span className="text-md">
                <i class="fa-solid fa-x"></i>
              </span>{" "}
              Close photo
            </button>
          </div>
          {place?.photos?.length > 0 &&
            place.photos.map((photo) => (
              <div className="flex justify-center">
                <img
                  src={photo}
                  alt=""
                  className="lg:max-w-[50%]"
                />
              </div>
            ))}
        </div>
      </div>
    );
  }

  return (
    <div className="my-4 px-8 pt-8 flex flex-col gap-2">
      <h1 className="text-3xl">{place.title}</h1>
      <a
        className="my-2 block font-semibold underline"
        target="_blank"
        href={`https://maps.google.com/?q=` + place.address}
      >
        <i class="fa-solid fa-location-dot mr-2"></i> {place.address}
      </a>
      <ImageShowcase setShowAllImages={setShowAllImages} place={place} />
      <div className="flex my-8 mx-auto gap-12">
        <div className=" w-2/3 grow-0 shrink flex flex-col gap-4">
          <div className=" border-t border-b border-gray-500  py-2 ">
            <h2 className="text-xl font-bold mb-2">Description</h2>
            <p>{place.description}</p>
          </div>
          <div className="border-b border-gray-500 pb-4">
            <span className="font-semibold">Check-In:</span>
            {place.checkIn}
            <br />
            <span className="font-semibold">Check-Out:</span>
            {place.checkOut}
            <br />
            <span className="font-semibold"> Max number of guests: </span>
            {place.maxGuests}
            <br />
          </div>
        </div>
        <BookingForm place={place} />
      </div>
      <div className="border-b border-gray-500  pb-4">
        <h2 className="text-xl font-bold mb-2">Extra Info</h2>
        {place.extraInfo}
      </div>
      <div>
        <h2 className="text-xl font-bold my-2">Perks</h2>
        <div className="flex flex-wrap gap-2 border-b border-gray-500  pb-4">
          {place.perks.length > 0 &&
            place.perks.map((perk) => (
              <div className="border border-gray-400 rounded-xl px-6 font-semibold py-2 uppercase">
                {perk}
              </div>
            ))}
        </div>
      </div>
      <Review placeId={place._id}/>
    </div>
  );
};

export default PlacePage;
