import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";

import PlacesForm from "./PlacesForm";

const Places = () => {
  const { action } = useParams();
  console.log(action);

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
        <PlacesForm/>
      )}
    </div>
  );
};

export default Places;
