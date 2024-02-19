import React from "react";
import axios from "axios";

const PhotosUploader = ({photoLink,addedPhotos,setAddedPhotos,setPhotoLink}) => {

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
    <>
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
        <button
          type="submit"
          onClick={addByLinkHandler}
          className="bg-primary text-sm px-3 text-white rounded-full"
        >
          Add photo
        </button>
      </div>
      <div className="mt-2 grid gap-2 grid-cols-3">
        {addedPhotos.length > 0 &&
          addedPhotos.map((link) => (
            <div key={link} className="h-32 flex  justify-center">
              <img
                className="rounded-2xl w-full object-cover"
                src={"http://localhost:4000" + link}
                alt=""
              />
            </div>
          ))}
        <label className="h-32 flex items-center justify-center cursor-pointer border bg-transparent rounded-2xl p-6 mb-2 text-xl">
          <input
            type="file"
            multiple
            className="hidden"
            onChange={uploadPhoto}
          />
          <i className="fa-solid fa-cloud-arrow-up mr-1"></i>
          Upload
        </label>
      </div>
    </>
  );
};

export default PhotosUploader;
