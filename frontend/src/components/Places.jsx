import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import Perks from "./Perks";
import axios from "axios";

const Places = () => {
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

  const addByLinkHandler = async (e)=>{
    e.preventDefault();
    console.log(photoLink);
    const {data:filename} = await axios.post('/uploadByLink',{link:photoLink});
    setAddedPhotos(prev=>{return [...prev,filename]});
    setPhotoLink('');
  }
  const uploadPhoto = async (e)=>{
      const files = e.target.files;
    console.log(files);
      const data = new FormData();
      for (let i = 0; i < files.length; i++) {
        data.append('photos',files[i]);
      }


      const {data:filename} = await axios.post('/upload',data,{
        headers:{'Content-type':'multipart/form-data'}
      })
      
      for (let i = 0; i < filename.length; i++) {
        setAddedPhotos(prev=>{return [...prev,filename[i]]});
      }
  }

  return (
    <div>
      {action != "new" && (
        <div className="flex justify-center">
          <Link
            className="mt-4 py-1 px-4 bg-primary rounded-full text-white"
            to={"/account/places/new"}
          >
            Add new place
          </Link>
        </div>
      )}
      {action === "new" && (
        <form className="flex flex-col gap-1 m-auto mb-12 w-1/2 ">
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

          <h1 className="text-2xl">Photos</h1>
          <p className="text-sm text-gray-400">more=better</p>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Add using a link ...jpg"
              className="border px-4 py-1 rounded-xl mb-2"
              value={photoLink}
              onChange={(e) => setPhotoLink(e.target.value)}
            />
            <button type="submit" onClick={addByLinkHandler} className="bg-primary text-sm px-3 text-white rounded-full">
              Add photo
            </button>


          </div>
          <div className="mt-2 grid gap-2 grid-cols-3">
            {addedPhotos.length>0 && addedPhotos.map(link => (
              <div className="h-32 flex  justify-center">
                <img className="rounded-2xl w-full object-cover" src={"http://localhost:4000"+link} alt="" />
              </div>
              ))} 
            <label className="h-32 flex items-center justify-center cursor-pointer border bg-transparent rounded-2xl p-6 mb-2 text-xl">
              <input type="file" multiple className="hidden" onChange={uploadPhoto}/>
              <i className="fa-solid fa-cloud-arrow-up mr-1"></i>
              Upload
            </label>
          </div>


          <h1 className="text-2xl">Description</h1>
          <p className="text-sm text-gray-400">description of the place</p>
          <textarea
            className="border px-4 py-1 rounded-xl"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />


          <Perks />
          <h1 className="text-2xl">Extra info</h1>
          <p className="text-sm text-gray-400">House rules,etc</p>
          <textarea className="border px-4 py-1 rounded-xl" value={extraInfo} onChange={e=>setExtraInfo}/>


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
                onChange={setcheckIn}
              />
            </div>

            <div>
              <h3>Check out time</h3>
              <input
                type="time"
                placeholder="14.00"
                className="border rounded-xl px-3 py-1 mt-2"
                value={checkOut}
                onChange={setCheckOut}
              />
            </div>

            <div>
              <h3>Max number of guests</h3>
              <input
                type="number"
                placeholder="5"
                className="border rounded-xl px-3 py-1 mt-2"
                value={maxGuests}
                onChange={e=>setMaxGuests(e.target.value)}
              />
            </div>
          </div>
          <button className="mt-4 py-2 px-4 bg-primary rounded-full text-white">
            Save
          </button>
        </form>
      )}
    </div>
  );
};

export default Places;
