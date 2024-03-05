import React, { useEffect, useState } from "react";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import Perks from "./Perks";
import axios from "axios";
import PhotosUploader from "./PhotosUploader";
import Loader from "../ui/Loader";
const PlacesForm = () => {
  const { action } = useParams();

  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("");
  const [addedPhotos, setAddedPhotos] = useState([]);
  const [photoLink, setPhotoLink] = useState("");
  const [description, setDescription] = useState("");
  const [perks, setPerks] = useState([]);
  const [extraInfo, setExtraInfo] = useState("");
  const [checkIn, setcheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [maxGuests, setMaxGuests] = useState(1);
  const [price, setPrice] = useState(100);
  const [redirect, setRedirect] = useState("");
  const [loading, setLoading] = useState(false);

  if (action != "new") {
    useEffect(() => {
      const getData = async () => {
        const { data } = await axios.get("/places/" + action);
        console.log(data);
        setTitle(data.title);
        setAddress(data.address);
        setAddedPhotos(data.photos);
        setDescription(data.description);
        setPerks(data.perks);
        setExtraInfo(data.extraInfo);
        setCheckOut(data.checkIn);
        setcheckIn(data.checkIn);
        setMaxGuests(data.maxGuests);
        setPrice(data.price);
      };

      getData();
    }, []);
  }

  const submitHandler = async (e) => {
    e.preventDefault();
    const reqBody = {
      title,
      address,
      addedPhotos,
      description,
      perks,
      extraInfo,
      checkIn,
      checkOut,
      maxGuests,
      price,
    };
    setLoading(true);
    if (action != "new") {
      const { data } = await axios.put(`/places/${action}`, reqBody);
      console.log(data);
    } else {
      const { data } = await axios.post("/places", reqBody);
    }
    setLoading(false);
    setRedirect("/account/places");
  };

  if (redirect) {
    return <Navigate to={"/account/places"} />;
  }
  return (
    <>
      <form
        className="flex flex-col gap-2 m-auto mb-12 w-1/2 "
        onSubmit={submitHandler}
      >
        <h1 className="text-2xl">Title</h1>
        <p className="text-sm text-gray-400">
          Title for your place. should be short and catchy as in advertisement
        </p>
        <input
          type="text"
          placeholder="Title"
          className="border px-4 py-1 rounded-xl mb-2"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <h1 className="text-2xl">Address</h1>
        <p className="text-sm text-gray-400">Address to this place</p>
        <input
          type="text"
          placeholder="Address"
          className="border px-4 py-1 rounded-xl mb-2"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />

        <PhotosUploader
          photoLink={photoLink}
          addedPhotos={addedPhotos}
          setAddedPhotos={setAddedPhotos}
          setPhotoLink={setPhotoLink}
        />

        <h1 className="text-2xl">Description</h1>
        <p className="text-sm text-gray-400">description of the place</p>
        <textarea
          className="border px-4 py-1 rounded-xl"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <Perks selected={perks} onChange={setPerks} />

        <h1 className="text-2xl">Extra info</h1>
        <p className="text-sm text-gray-400">House rules,etc</p>
        <textarea
          className="border px-4 py-1 rounded-xl"
          value={extraInfo}
          onChange={(e) => setExtraInfo(e.target.value)}
        />

        <h1 className="text-2xl">Check in & Check out times </h1>
        <p className="text-sm text-gray-400">
          add check in and out times, remember to have somw time window for
          cleaning the room between guests
        </p>

        <div className="flex flex-wrap gap-4">
          <div>
            <h3>Check in time</h3>
            <input
              type="time"
              placeholder="14.00"
              className="border rounded-xl px-3 py-1 mt-2"
              value={checkIn}
              onChange={(e) => setcheckIn(e.target.value)}
            />
          </div>

          <div>
            <h3>Check out time</h3>
            <input
              type="time"
              placeholder="14.00"
              className="border rounded-xl px-3 py-1 mt-2"
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
            />
          </div>

          <div>
            <h3>Max number of guests</h3>
            <input
              type="number"
              placeholder="5"
              className="border rounded-xl px-3 py-1 mt-2"
              value={maxGuests}
              onChange={(e) => setMaxGuests(e.target.value)}
            />
          </div>
        </div>
        <h1 className="text-2xl">Price per night</h1>
        {/* <p className="text-sm text-gray-400">Address to this place</p> */}
        <input
          type="text"
          placeholder="price per night"
          className="border px-4 py-1 rounded-xl mb-2"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <button
          type="submit"
          className="mt-4 py-2 px-4 bg-primary rounded-full text-white"
        >
          {loading ? (
            <Loader/>
            ) : (
            "Save"
          )}
        </button>
      </form>
    </>
  );
};

export default PlacesForm;
