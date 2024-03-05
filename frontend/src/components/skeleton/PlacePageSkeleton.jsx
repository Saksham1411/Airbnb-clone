import React from "react";
import { Skeleton } from "../ui/skeleton";

const PlacePageSkeleton = () => {
  return (
    <div className="my-4 px-8 pt-8 flex flex-col gap-2">
      <Skeleton className="h-8 w-1/3" />
      <Skeleton className="h-3 w-1/4" />
      <div className="h-96 m-auto overflow-hidden my-6">
        <div className="flex gap-4 rounded-xl">
          <Skeleton className="h-96 w-[30rem] rounded-xl" />
          <div className="flex flex-col gap-2 rounded-xl">
            <Skeleton className="h-48 w-64 rounded-xl" />
            <Skeleton className="h-48 w-64 rounded-xl" />
          </div>
        </div>
      </div>
      <div className="flex gap-8 mx-12">
        <Skeleton className="h-64 w-2/3 rounded-xl" />
        <Skeleton className="h-64 w-1/4 rounded-xl" />
      </div>
    </div>
  );
};

export default PlacePageSkeleton;
