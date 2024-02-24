import React from 'react'

const ImageShowcase = ({setShowAllImages,place}) => {
  return (
    <>
    <div className="relative max-h-96 m-auto">
        <div className="flex gap-2 rounded-2xl border overflow-hidden">
          <div className="flex">
            {place.photos?.[0] && (
              <img
                className="object-cover max-h-96"
                src={"http://localhost:4000" + place.photos[0]}
                alt=""
              />
            )}
          </div>
          <div className="flex flex-col gap-2 max-h-96 overflow-hidden">
            {place.photos?.[1] && (
              <img
                className=" object-cover max-h-48"
                src={"http://localhost:4000" + place.photos[1]}
                alt=""
              />
            )}
            {place.photos?.[2] && (
              <img
                className=" object-cover max-h-48"
                src={"http://localhost:4000" + place.photos[2]}
                alt=""
              />
            )}
          </div>
        </div>
        <button
          onClick={() => setShowAllImages(true)}
          className="absolute right-2 bottom-2 bg-white px-2 py-1 rounded-lg shadow-md"
        >
          Show all photos
        </button>
      </div>
    </>
  )
}

export default ImageShowcase